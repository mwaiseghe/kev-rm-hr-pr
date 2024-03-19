import {Router} from 'express';
import { authenticateUser } from './authService.js';

const loginRouter = Router();

loginRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const token = authenticateUser(username, password);

    if (!token) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ token });
});

export default loginRouter;
