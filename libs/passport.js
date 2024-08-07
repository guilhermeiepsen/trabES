import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '@/models/user';

passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    User.authenticate()
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
