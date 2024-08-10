"use client"
import FeedbackForm from "@/components/ClientFeedback";
import ServerFeedback from "@/components/FeedbackForm";
import { useState, useEffect } from "react";

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

export default function CreateFeedback({ params }) {
    const { id } = params;
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmployeeById(id);
            setEmployee(data.employee || {}); // Ajuste conforme a estrutura de resposta
        };

        fetchData();
    }, [id]);

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

    return <ServerFeedback 
                id={id} 

            />;
}

/*
"use client";
import FeedbackForm from "@/components/FeedbackForm";
import { useState } from "react";

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


export default async function CreateFeedback({ params }) {
    const { id } = params;
    const { employeeId } = id;
    const {employee} = await getEmployeeById(id);
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
                name={name} 
                />;
}
                */