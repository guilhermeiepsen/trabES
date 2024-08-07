import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '@/models/user';
import connectMongoDB from '@/libs/mongodb';

connectMongoDB();

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
