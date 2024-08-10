import EmployeesList from "@/components/EmployeesList";
import VacationsList from "@/components/VacationsList";
import Navbar from "@/components/Navbar";

export default function Home() {
  return <>
    <EmployeesList />
    <VacationsList/>
  </>
}