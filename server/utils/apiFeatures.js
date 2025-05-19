class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const filter = {};
    for (const key in queryObj) {
      if (key.includes("[")) {
        const [field, operator] = key.replace("]", "").split("[");
        if (!filter[field]) filter[field] = {};
        filter[field][`$${operator}`] = Number(queryObj[key]);
      } else {
        filter[key] = queryObj[key];
      }
    }

    this.mongooseQuery = this.mongooseQuery.find(filter);
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(countDocuments / limit);
    this.hasNextPage = skip + limit < countDocuments;
    this.hasPreviousPage = skip > 0;
    this.nextPage = this.hasNextPage ? page + 1 : null;
    this.previousPage = this.hasPreviousPage ? page - 1 : null;
    this.totalDocuments = countDocuments;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      if (modelName === "Product") {
        this.mongooseQuery = this.mongooseQuery.find({
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        });
      } else {
        this.mongooseQuery = this.mongooseQuery.find({
          name: { $regex: keyword, $options: "i" },
        });
      }
    }
    return this;
  }
}

export default ApiFeatures;
