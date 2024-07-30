import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiCheck, HiInformationCircle } from "react-icons/hi";

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

export default async function EmployeesList() {
    
  const { vacations } = await getVacations();
  vacations.map((t) => {
    t.startDate = new Date(t.startDate);
    t.endDate = new Date(t.endDate);
  })
  //console.log(topics);
  
  return (
        <>
        <Link className="bg-neutral-950 hover:bg-neutral-800 p-2 rounded-lg text-neutral-200" href={"/addVacation"}>
                Pedir Férias
            </Link>
          {vacations.map((t) => (
              <div className="p-4 bg-neutral-950 my-3 flex justify-between items-center gap-5 items-start rounded-lg  text-neutral-100 tracking-wide">
                <div>
                  <h2 className="font-bold text-2xl">Nome do funcionário</h2>
                  <h4 className="text-sm text-neutral-400">
                    Pedindo de <span className="text-neutral-300 font-bold">{t.startDate.toLocaleDateString('pt-BR')} </span> 
                    a <span className="text-neutral-300 font-bold">{t.endDate.toLocaleDateString('pt-BR')}</span>
                    </h4>
                </div>
                <div className="flex gap-2">
                    <Link href={`/viewEmployee/${t._id}`}>
                        <HiInformationCircle size={24} />
                    </Link>
                    <Link href={`/editTopic/${t._id}`}>
                        <HiCheck size={24} />
                    </Link>
                    <RemoveBtn id={t._id} />
                </div>
              </div>
          ))}
        </>
      );
}