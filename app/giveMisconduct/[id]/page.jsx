import MisconductForm from "@/components/MisconductForm";
import { cookies } from "next/headers";
import EmployeesList from "@/app/employeesList/page";


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

    const {value} = cookies().get('user');
    const role = cookies().get('role');
    
    //console.log(giverId);
    //console.log(role);

    if(role.value == 2) {
        return <MisconductForm
                idEmployee={id} 
                giverId = {value}
                //role = {role.value}
                //name={name} 
                />;
    }
    else {
        return <EmployeesList/>
    }


    
}
    