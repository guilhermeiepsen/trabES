"use client";
import Link from 'next/link';

export default function HRPolicyPage() {
    return (
        <div className="min-h-screen p-8 text-white">
            <Link href="/home" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 self-center">Voltar</Link>
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">Política de RH</h1>
                <p className="text-lg">Bem-vindo à política de recursos humanos da nossa empresa.</p>
            </header>

            <main className="space-y-6">
                <section className="p-4 border border-white rounded">
                    <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
                    <p>
                        Nossa política de recursos humanos é projetada para garantir um ambiente de trabalho 
                        positivo e inclusivo. Valorizamos a diversidade e o crescimento contínuo de todos os nossos colaboradores.
                    </p>
                </section>

                <section className="p-4 border border-white rounded">
                    <h2 className="text-2xl font-semibold mb-4">Benefícios</h2>
                    <ul className="list-disc pl-5">
                        <li>Plano de Saúde</li>
                        <li>Vale Alimentação</li>
                        <li>Desenvolvimento Profissional</li>
                    </ul>
                </section>

                <section className="p-4 border border-white rounded">
                    <h2 className="text-2xl font-semibold mb-4">Código de Conduta</h2>
                    <p>
                        Esperamos que todos ajam com integridade e respeito. A violação das políticas pode levar a ações disciplinares.
                    </p>
                </section>

                <section className="p-4 border border-white rounded">
                    <h2 className="text-2xl font-semibold mb-4">Contatos e Suporte</h2>
                    <p>
                        Para mais informações, entre em contato com o RH pelo e-mail <a href="mailto:rh@empresa.com" className="text-blue-400 underline">rh@empresa.com</a>.
                    </p>
                </section>
            </main>

            <footer className="text-center mt-6 text-sm">
                <p>© 2024 Empresa. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
