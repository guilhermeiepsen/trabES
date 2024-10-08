import FeedbackForm from "@/components/FeedbackForm";
import { cookies } from 'next/headers';
import EmployeesList from "@/app/employeesList/page";


export default async function CreateFeedback({ params }) {
    const { id } = params;
    const {value} = cookies().get('user');
    const role = cookies().get('role');

    if(role.value == 1) {
        return <FeedbackForm 
                    id={id} 
                    giverId={value} 
                    />;
    }
    else {
        return <EmployeesList/>
    }
}
    