import FeedbackForm from "@/components/FeedbackForm";
import { cookies } from 'next/headers';


export default async function CreateFeedback({ params }) {
    const { id } = params;
    const {value} = cookies().get('user');
    const giverId = value;


    return <FeedbackForm 
                id={id} 
                giverId={giverId} 
                />;
}
    