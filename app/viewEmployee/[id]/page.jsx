import ViewTopicForm from "@/components/ViewTopicForm";

const getTopicById = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: "no-store",
        });

        if(!res.ok) {
            throw new Error("Failed to fetch topic");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function ViewTopic({ params }) { //como é um dynamic router, ou seja, no final tem um /id(numero da id), recebe como parametro esse id.
    const { id } = params;
    const {employee} = await getTopicById(id);
    const {
        name, 
        cpf,
        phoneNumber,
        corporateEmail,
        department,
        role,
        active
    } = employee;

    return <ViewTopicForm 
                id={id} 
                name={name} 
                cpf={cpf}
                phoneNumber={phoneNumber} 
                corporateEmail={corporateEmail} 
                department={department} 
                role={role}
                active={active}
                />;
}