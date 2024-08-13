import { cookies } from 'next/headers';
import SearchEmployee from '@/components/SearchEmployee';


export default async function createSearchList() {
    const {value} = cookies().get('user');
    const role = cookies().get('role');

    return < SearchEmployee 
                id={value}
                role={role.value}
                />


}
