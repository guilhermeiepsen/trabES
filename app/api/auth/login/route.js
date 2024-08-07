// pages/api/auth/login.js
import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import passport from '@/libs/passport';
import session from 'cookie-session';

// Middleware para configurar a sessão
const sessionMiddleware = session({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000, // 24 horas
});

export default async function handler(req, res) {
  await connectMongoDB();
  sessionMiddleware(req, res, async () => {
    if (req.method === 'POST') {
      return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
          if (err) {
            return reject(res.status(500).json({ message: err.message }));
          }
          if (!user) {
            return resolve(res.status(401).json({ message: info.message }));
          }
          req.logIn(user, (err) => {
            if (err) {
              return reject(res.status(500).json({ message: err.message }));
            }
            return resolve(res.status(200).json({ message: 'Login successful' }));
          });
        })(req, res);
      });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
