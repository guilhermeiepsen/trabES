import MisconductForm from "@/components/MisconductForm";
import { cookies } from "next/headers";


export default async function CreateMisconductReport({ params }) {
    const { id } = params;
    //console.log(params);
    /*
    //const { employeeId } = id;
    //const {employee} = await getEmployeeById(id);
    const {
        name, 
        phoneNumber,
        corporateEmail,
        department,
        role,
        active
    } = employee;
    */

    const giverId = cookies().get('user');
    const role = cookies().get('role');
    console.log(giverId);
    console.log(role);




    return <MisconductForm
                idEmployee={id} 
                //giverId = { giverId.value }
                //role = {role.value}
                //name={name} 
                />;
}
    