import { withIronSessionApiRoute } from 'iron-session/next';

const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'myapp_cookiename',
    
};

export function withSessionRoute(handler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}
