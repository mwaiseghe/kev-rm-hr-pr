import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret'; 

const users = [
    { UserID: 1, EmployeeID: 1, Username: 'user1', PasswordHash: bcrypt.hashSync('password1', 10), RoleID: 1 },
    { UserID: 2, EmployeeID: 2, Username: 'user2', PasswordHash: bcrypt.hashSync('password2', 10), RoleID: 2 }
];

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
};

export const authenticateUser = (username, password) => {
    const user = users.find(user => user.Username === username);

    if (!user || !bcrypt.compareSync(password, user.PasswordHash)) {
        return null;
    }

    return generateToken({ userID: user.UserID, roleID: user.RoleID });
};
