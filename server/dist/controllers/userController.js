"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) => {
    const { username, password } = req.body;
    User_1.default.register(new User_1.default({ username }), password, (err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        passport_1.default.authenticate("local")(req, res, () => {
            res.status(201).json({ message: "Registration successful", user });
        });
    });
};
exports.registerUser = registerUser;
const loginUser = (req, res) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ message: "Login successful", user });
        });
    })(req, res);
};
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Logout successful" });
    });
};
exports.logoutUser = logoutUser;
