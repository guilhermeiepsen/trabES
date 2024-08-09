import ViewEmployeeForm from "@/components/ViewEmployeeForm";

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

export default async function ViewEmployee({ params }) { //como é um dynamic router, ou seja, no final tem um /id(numero da id), recebe como parametro esse id.
    const { id } = params;
    const {user} = await getEmployeeById(id);
    const {
        name, 
        dateOfBirth,
        cpf,
        phoneNumber,
        corporateEmail,
        department,
        admissionDate,
        role,
        active
    } = user;

    return <ViewEmployeeForm 
                id={id} 
                name={name} 
                dateOfBirth={dateOfBirth}
                cpf={cpf}
                phoneNumber={phoneNumber} 
                corporateEmail={corporateEmail} 
                department={department} 
                admissionDate={admissionDate}
                role={role}
                active={active}
                />;
}