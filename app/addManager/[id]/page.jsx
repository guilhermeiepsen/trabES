import ViewManagerForm from "@/components/ViewManagerForm";

const getEmployeeById = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/manager/${id}`, {
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

export default async function ViewEmployee({params}) { //como é um dynamic router, ou seja, no final tem um /id(numero da id), recebe como parametro esse id.
    const {id} = params
    const { user} = await getEmployeeById(id);

    return <ViewManagerForm
                id={id}
                name={user.username} 
                department={user.department} 
                role={user.role}
                />;
}