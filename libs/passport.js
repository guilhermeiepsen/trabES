import passport from 'passport';
import User from '@/models/user';
import connectMongoDB from '@/libs/mongodb';

connectMongoDB();

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
