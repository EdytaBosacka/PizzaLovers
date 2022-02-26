"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
const registeredUsers = [{ userName: 'admin', password: 'admin' }];
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/login', (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    if (registeredUsers.find(element => element.userName === username && element.password === password)) {
        res.status(200).send('Login successful');
    }
    else {
        res.status(401).send('Password or/and login is invalid. Please try again.');
    }
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map