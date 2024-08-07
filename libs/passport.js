// libs/passport.js

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '@/models/user';

passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
        try {
            const user = await User.findOne({username});
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isMatch = await user.authenticate(password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
