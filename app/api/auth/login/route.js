// pages/api/auth/login.js
import passport from '@/libs/passport';
import { withSession } from '@/libs/session';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(passport.initialize()).use(passport.session());

handler.post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Invalid username or password' });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ message: 'Logged in successfully' });
        });
    })(req, res, next);
});

export default withSession(handler);
