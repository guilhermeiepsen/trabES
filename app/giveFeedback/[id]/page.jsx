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