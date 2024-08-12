import Link from "next/link";
import RemoveBtn from "../../components/RemoveVacation";
import ApproveVacation from "@/components/ApproveVacation";
import { HiCheck, HiInformationCircle } from "react-icons/hi";
import { cookies } from "next/headers";

const getVacations = async() => { //COMO PEGAR OS TOPICOS? DO BANCO DE DADOS. A FUNÇÃO GET DE api/topics/route.js FAZ ISSO.
  try {
    const res = await fetch('http://localhost:3000/api/vacations/', { //AQUI ESTÁ O ENDPOINT DA FUNÇAO GET.
      //NÃO PRECISA COLOCAR O MÉTODO "GET" POIS A FUNÇAO GET EH A UNICA FUNÇAO DO COMPONENTE QUE NÃO TEM PARÂMETRO. PORTANTO VAI PEGAR ELA POR DEFAULT QUANDO NÃO HÁ UM MÉTODO REQUERIDO.
      cache: "no-store", //COLOCAR ESSE PARAMETRO DE CACHE PARA QUE SEMPRE QUE O ENDPOINT SER VISITADO VAI PEGAR OS DADOS UPDATADOS. DO CONTRÁRIO, O NEXT PEGA SÓ O PRIMEIO DADO CARREGADO NO BANCO POIS COLOCA NA CACHE E PUXA DELA
    });

    if(!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();

  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

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

export default async function EmployeesList() {
    
  const { vacations } = await getVacations();
  var statusDescription = {
    0: 'Em Análise',
    1: 'Aprovada',
    2: 'Não Aprovada'
  }
  vacations.map(async (t) => {
    t.startDate = new Date(t.startDate);
    t.endDate = new Date(t.endDate);
  })
  console.log(vacations);

  let cookie = cookies().get('user');
  const loggedId = cookie.value;
  cookie = cookies().get('role');
  const role = cookie.value;

  console.log(loggedId);
  console.log(role);
  
  return (
        <>
        <Link href="/home" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 self-center">Voltar</Link>
        <Link className="bg-red-950 hover:bg-red-800 p-2 rounded-lg text-neutral-200" href={"/addVacation"}>
                Solicitar Férias
            </Link>
          {vacations.map((t) => (
            t.employeeId._id == loggedId || role != 2 ?
              <div className="p-4 bg-neutral-950 my-3 flex justify-between items-center gap-5 items-start rounded-lg  text-neutral-100 tracking-wide">
                
                <div>
                  <h2 className="font-bold text-2xl">{t.employeeId.name}</h2>
                  <h4 className="text-sm text-neutral-400">
                    Pedindo de <span className="text-neutral-300 font-bold">{t.startDate.toLocaleDateString('pt-BR')} </span> 
                    a <span className="text-neutral-300 font-bold">{t.endDate.toLocaleDateString('pt-BR')}</span>
                  </h4>
                  <h4 className="text-xs text-neutral-300">{t.message}</h4>
                </div>
                <div className="flex gap-2">
                    {t.status == 0 && role != 2 ? <><ApproveVacation id={t._id} managerId={loggedId} response={1}/> <ApproveVacation id={t._id} managerId={loggedId} response={2}/></> : ''}
                    {t.status == 1 && role != 2 ? 'Aprovada por ' + t.managerId.username : null}
                    {t.status == 2 ? 'Negada por ' + t.managerId.username : null}
                    {role == 0 && t.status == 0 ? <RemoveBtn id={t._id}/> : null}
                </div>
              </div> : null
            ))}
        </>
      );
}