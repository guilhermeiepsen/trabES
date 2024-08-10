

//import cookie from "cookie";

//import { cookies } from 'next/headers'

import { FeedbackForm } from './ClientFeedback'


export default function ServerFeedback( { id } ) {
    // Server-side: based on HTTP resquest cookie only
    const employeeId = id;
    const giverId = cookies().get('session')?.value
    return <FeedbackForm giverId={{ giverId , employeeId}} />
}