/*
"use client"
//import FeedbackForm from "@/components/ClientFeedback";
import { FeedbackForm } from "@/components/FeedbackForm";
import { useState, useEffect } from "react";
//import cookies from "js-cookie"



const getEmployeeById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch employee");
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return {}; // Retorna um objeto vazio em caso de erro
    }
};

export default async function CreateFeedback({ params }) {
    const { id } = params;
    //const [giverId, setEmployee] = useState(null);
    
    /*
    //const {employee} = await getEmployeeById(id);

    if (!employee) {
        return <div>Loading...</div>; // ou alguma outra mensagem de carregamento
    }

    const {
        name, 
        phoneNumber,
        corporateEmail,
        department,
        role,
        active
    } = employee;
    return <FeedbackForm 
    id={id}
    //giver = {giverId} 
    
    />;
}
*/
import FeedbackForm from "@/components/FeedbackForm";


export default async function CreateFeedback({ params }) {
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
    return <FeedbackForm 
                idEmployee={id} 
                //name={name} 
                />;
}
    