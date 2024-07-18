import passport from "passport";

import { Request, Response } from "express";
import User from "../models/User";

export const registerUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    passport.authenticate("local")(req, res, () => {
      res.status(201).json({ message: "Registration successful", user });
    });
  });
};

export const loginUser = (req: Request, res: Response) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
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

export const logoutUser = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};
