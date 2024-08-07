// libs/session.js
import { withIronSessionApiRoute } from "iron-session/next";

const sessionOptions = {
    secret: 'humanlink-secret',
    cookieName: "humanlink_cookie",
    cookieOptions: {
        httpOnly: true,
    },
};

export function withSession(handler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}
