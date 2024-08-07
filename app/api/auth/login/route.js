import connectMongoDB from '@/libs/mongodb';
import passport from '@/libs/passport';
import session from 'cookie-session';

const sessionMiddleware = session({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
});

export async function POST(req) {
    const { username, password } = await req.json();
    await connectMongoDB();


}
