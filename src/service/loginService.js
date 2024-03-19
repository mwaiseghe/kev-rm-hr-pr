import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 8100;
const JWT_SECRET = 'secret';

const users = [
    { UserID: 1, EmployeeID: 1, Username: 'user1', PasswordHash: bcrypt.hashSync('password1', 10), RoleID: 1 },
    { UserID: 2, EmployeeID: 2, Username: 'user2', PasswordHash: bcrypt.hashSync('password2', 10), RoleID: 2 }
];

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.Username === username);

    if (!user || !bcrypt.compareSync(password, user.PasswordHash)) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userID: user.UserID, roleID: user.RoleID }, JWT_SECRET);

    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
