// const jwt = require('jsonwebtoken');



// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         req.user = decoded; // Set user data from token
//         next();
//     });
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = { id: decoded.id }; // Set user ID from decoded token
        next();
    });
};

module.exports = authMiddleware;
