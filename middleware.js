import { NextResponse } from 'next/server';

export async function middleware(req) {
    const session = req.cookies.get('user');

    if (session) {
        return NextResponse.next();
    }else{
        return NextResponse.redirect(new URL('/', req.url));
    }
    
}


export const config = {
    matcher: [
        '/home', 
        '/addTopic', 
        '/addVacation', 
        '/editTopic', 
        '/viewEmployee', 
        '/giveFeedback', 
        '/hrPolicy', 
        '/searchEmployee',
        '/addManager',
        '/approveVacation',
        '/feedbackList',
        '/giveMisconduct',
        '/reportList',
        '/vacationsList'
    ],
};
