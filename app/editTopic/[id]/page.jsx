import EditEmployeeForm from "@/components/EditEmployeeForm";

const getEmployeeById = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
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

export default async function EditEmployee({ params }) { //como é um dynamic router, ou seja, no final tem um /id(numero da id), recebe como parametro esse id.
    const { id } = params;
    const {user} = await getEmployeeById(id);
    const {
        name, 
        phoneNumber,
        corporateEmail,
        department,
        role,
        active
    } = user;

    return <EditEmployeeForm 
                id={id} 
                name={name} 
                phoneNumber={phoneNumber} 
                corporateEmail={corporateEmail} 
                department={department} 
                role={role}
                active={active}
                />;
}