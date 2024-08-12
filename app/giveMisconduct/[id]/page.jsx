import MisconductForm from "@/components/MisconductForm";


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
    return <MisconductForm
                idEmployee={id} 
                //name={name} 
                />;
}
    