import Jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import STATUS_CODE from "../constants/statusCodes.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Not authorized" });
        }
    } else {
        res.status(STATUS_CODE.UNAUTHORIZED).json({ message: "No token, authorization denied" });
    }
};

export default protect;
