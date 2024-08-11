import VacationForm from '@/components/VacationForm'
import { cookies } from 'next/headers';


export default async function AddVacation({ params }) {
    const {value} = cookies().get('user');


    return <VacationForm 
                id={value} 
                />;
}