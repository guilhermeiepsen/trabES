import session from 'express-session';
import connectMongoDB from './mongodb'; // Certifique-se de que este arquivo está configurado corretamente

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
    store: new (require('connect-mongo')).default({ mongooseConnection: connectMongoDB() })
});

export default sessionMiddleware;
