import passport from "passport";
import { UserModel } from "./models/UserModel.js";
import {Strategy as LocalStrategy} from "passport-local";

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export default passport;
