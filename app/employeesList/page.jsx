import Link from "next/link";
import RemoveBtn from "../../components/RemoveUser";
import { cookies } from 'next/headers';
import { HiPencilAlt, HiUser, HiAnnotation, HiExclamation, HiRefresh } from "react-icons/hi";

const getEmployees = async() => { //COMO PEGAR OS TOPICOS? DO BANCO DE DADOS. A FUNÇÃO GET DE api/topics/route.js FAZ ISSO.
  try {
    const res = await fetch('http://localhost:3000/api/employees/', { //AQUI ESTÁ O ENDPOINT DA FUNÇAO GET.
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

  const giverId = cookies().get('user');
  const role = cookies().get('role');
  
  
  const { users } = await getEmployees();
  const rolesDescription = {
    0: 'Administrador',
    1: 'Gerente',
    2: 'Funcionário'
  }
  //console.log(users);
  
  return (
        <>
          <div className="flex justify-between">
            <Link href="/home" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 self-left max-w-fit text-neutral-400">
                      Voltar
            </Link>
            <Link className="bg-blue-800 hover:bg-blue-700 p-2 rounded-lg text-neutral-200" href={"/register"}>
                  Registrar Funcionário
            </Link>
            {/* <Link className="text-neutral-100" href={"/searchEmployee"}>
                        PESQUISAR FUNCIONÁRIO
            </Link> */}
          </div>
          {users.map((t) => (
        
              <div className="p-4 bg-neutral-950 my-3 flex-col justify-between items-center gap-5 items-start rounded-lg  text-neutral-100 tracking-wide">
                <div>
                  <h2 className="font-bold text-2xl">{t.name}</h2>
                  <h4 className="text-sm text-neutral-300">{t.role} <span className="text-neutral-400">em</span> {t.department}</h4>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  {rolesDescription[t.userType]}
                   { role.value == 0 ?
                    <Link href={`/addManager/${t._id}`} title="Trocar Cargo">
                        <HiRefresh size={24}/>
                    </Link>: null
                    }
                    { role.value != 2 ?
                    <Link href={`/viewEmployee/${t._id}`} title="Visualizar">
                        <HiUser size={24} />
                    </Link>: null
                    }

                    { role.value != 2 ?
                    <Link href={`/editTopic/${t._id}`} title="Editar">
                        <HiPencilAlt size={24} />
                    </Link>: null
                    }
                    { role.value != 2 ?
                    <Link href={`/giveFeedback/${t._id}`} title="Avaliar">
                        <HiAnnotation size={24}/>
                    </Link>: null
                    }

                    { role.value == 2 ?
                    <Link href={`/giveMisconduct/${t._id}`} title="Denunciar Conduta">
                        <HiExclamation size={24} color="yellow"/>
                    </Link>: null
                    }
                    
                    { role.value != 2 ?
                    <RemoveBtn id={t._id}/>
                    : null
                    }
                </div>
              </div>
          ))}
        </>
      );
}