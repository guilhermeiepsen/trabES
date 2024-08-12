// pages/reports/index.js
import Link from 'next/link';
import { HiEye } from 'react-icons/hi';




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

const getReports = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/misconduct', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch reports');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading reports:', error);
    return [];
  }
};

export default async function ReportsList() {
  const {reports} = await getReports();
    //console.log(reports[0].)

    //console.log(reports[0].reporterId)
  return (
    <>
      <div className="flex justify-between mb-4">
        <Link href="/home" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 text-neutral-400">
          Voltar
        </Link>
      </div>

      {
        reports.map((t) => (
            //getEmployeeById(t.reporterId);
          <div key={t._id} className="p-4 bg-neutral-950 my-3 flex-col rounded-lg text-neutral-100">
            <h2 className="font-bold text-2xl">Denúncia de {t.reporterId.name}</h2>
            <p className="text-sm text-neutral-300">{t.description}</p>
            <p className="text-sm text-neutral-400">Denunciado por: {t.reporterId.name}</p>
            <p className="text-sm text-neutral-400">Funcionário denunciado: {t.employeeId.name}</p>
            <p className="text-sm text-neutral-400">Data: {new Date(t.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      }
    </>
  );
}
