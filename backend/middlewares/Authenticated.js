import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized User",
                success: false,
            });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // If the token is invalid
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        }

        // Attach the decoded userId to the request object
        req.id = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export default isAuthenticated;
