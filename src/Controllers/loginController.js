import express from 'express';
import { verifyToken, isAdmin, isEmployee } from '../middlewares/AuthMiddleware.js';

const app = express();

app.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Admin route accessed successfully' });
});

app.get('/employee', verifyToken, isEmployee, (req, res) => {
    res.json({ message: 'Employee route accessed successfully' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
