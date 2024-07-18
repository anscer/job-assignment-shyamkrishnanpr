import express from "express";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db";
import dotenv from "dotenv";
import stateRouter from "./routes/stateRoutes";
import userRoutes from "./routes/userRoutes";
import User, { IUser } from "./models/User";
dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id)
    .then((user: any) => {
      done(null, user);
    })
    .catch((err: any) => {
      done(err, null);
    });
});

app.use("/api/states", stateRouter);
app.use("/api/users", userRoutes);

export default app;
