import EditTopicForm from "@/components/EditTopicForm";

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

export default async function EditTopic({ params }) { //como é um dynamic router, ou seja, no final tem um /id(numero da id), recebe como parametro esse id.
    const { id } = params;
    const {topic} = await getTopicById(id);
    const {title, description} = topic;

    return <EditTopicForm id={id} title={title} description={description} />;
}