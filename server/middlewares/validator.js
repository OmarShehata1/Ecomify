// desc : Middleware to validate request data using express-validator
import { validationResult } from "express-validator";

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default validatorMiddleware;