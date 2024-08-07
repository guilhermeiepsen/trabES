import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import passport from '@/libs/passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

export async function POST(request) {
    await connectMongoDB();
    const store = MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 60 * 60
    });

    store.on('error', function (e) {
        console.log('SESSION STORE ERROR', e);
    });

    const sessionConfig = {
        store,
        name: 'humanlink',
        secret: 'humanlinksecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Set to true in production
            expires: Date.now() + 1000 * 60 * 60 * 24,
            maxAge: 1000 * 60 * 60 * 24
        }
    };

    // Initialize passport and session
    const express = require('express');
    const app = express();
    app.use(session(sessionConfig));
    app.use(passport.initialize());
    app.use(passport.session());

    // Passport authentication
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return reject(new NextResponse('Error', { status: 500 }));
            }
            if (!user) {
                return reject(new NextResponse('Invalid credentials', { status: 401 }));
            }
            req.logIn(user, (err) => {
                if (err) {
                    return reject(new NextResponse('Error', { status: 500 }));
                }
                return resolve(new NextResponse('Logged in', { status: 200 }));
            });
        })(request, null, (err) => {
            if (err) {
                return reject(new NextResponse('Error', { status: 500 }));
            }
        });
    });
}
