import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret'; 

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.roleID === 1) {
        return next(); 
    } else {
        return res.status(403).json({ error: 'Unauthorized: You are not an admin' });
    }
};

const isEmployee = (req, res, next) => {
    if (req.user.roleID === 2) {
        return next(); 
    } else {
        return res.status(403).json({ error: 'Unauthorized: You are not an employee' });
    }
};

export { verifyToken, isAdmin, isEmployee };
