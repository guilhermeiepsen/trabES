import FeedbackForm from "@/components/FeedbackForm";
import { cookies } from 'next/headers';

const getEmployeeById = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/feedback/${id}`, {
            cache: "no-store",
        });

        if(!res.ok) {
            throw new Error("Failed to fetch employee");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};


export default async function CreateFeedback({ params }) {
    const { id } = params;
    const {user} = await getEmployeeById(id);
    const {value} = cookies().get('user');
    const giverId = value;


    return <FeedbackForm 
                id={id} 
                giverId={giverId} 
                />;
}