//lib/passport.js
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '@/models/user';
import connectMongoDB from '@/lib/mongodb';

connectMongoDB(); // Certifique-se de que a conexão com o MongoDB está ativa

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
