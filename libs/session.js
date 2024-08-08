//lib/session
import session from 'cookie-session';

export const sessionMiddleware = session({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1  dia
});
