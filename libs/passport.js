import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import connectMongoDB from '@/libs/mongodb';

passport.use(new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
        await connectMongoDB();
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    await connectMongoDB();
    const user = await User.findById(id);
    done(null, user);
});

export default passport;
