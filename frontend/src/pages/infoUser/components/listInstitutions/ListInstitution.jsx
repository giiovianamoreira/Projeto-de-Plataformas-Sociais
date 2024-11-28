// Importa o hook `useInstitution` de um contexto que gerencia o estado das instituições
import { useInstitution } from "../../../../context/institutionContext";
// Importa o arquivo de estilos CSS para o componente
import './index.css'
// Importa o componente `CreateInstitutionCard`, responsável por criar novas instituições
import { CreateInstitutionCard } from "./components/createinstitution/createInstitution";

// Definindo o componente principal `Component2`
export const Component2 = () => {
    // Desestrutura o estado `institutions` do contexto `useInstitution`
    const { institutions } = useInstitution();

    return (
        // Div que contém o componente de gerenciamento de instituições
        <div className="control-mananger">
            {/* Componente para criar uma nova instituição */}
            <CreateInstitutionCard />
            
            <div>
                {/* Título para a seção de instituições cadastradas */}
                <h2>Instituições Cadastradas</h2>
                
                {/* Lista de instituições cadastradas */}
                <ul>
                    {/* Verifica se existem instituições cadastradas e se a lista não está vazia */}
                    {institutions && institutions.length > 0 ? (
                        // Filtra as instituições verificadas e mapeia para exibição
                        institutions
                            .filter(inst => inst.verified) // Filtra apenas as instituições verificadas
                            .map((inst) => (
                                // Exibe cada instituição em uma lista
                                <li key={inst.id}>
                                    {/* Exibe o nome da instituição */}
                                    <strong>Nome:</strong> {inst.nome} <br />
                                    {/* Exibe o CNPJ da instituição */}
                                    <strong>CNPJ:</strong> {inst.cnpj} <br />
                                </li>
                            ))
                    ) : (
                        // Caso não haja instituições verificadas, exibe uma mensagem padrão
                        <li>Nenhuma instituição cadastrada.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
