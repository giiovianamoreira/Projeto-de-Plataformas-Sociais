import { useInstitution } from "../../../../context/institutionContext";
import './index.css'
import { CreateInstitutionCard } from "./components/createinstitution/createInstitution";
export const Component2 = () => {
    const { institutions } = useInstitution();

    return (
        <div className="control-mananger">
            <CreateInstitutionCard />
            <div>
                <h2>Instituições Cadastradas</h2>
                <ul>
                    {institutions && institutions.length > 0 ? (
                        institutions
                            .filter(inst => inst.verified)
                            .map((inst) => (
                                <li key={inst.id}>
                                    <strong>Nome:</strong> {inst.nome} <br />
                                    <strong>CNPJ:</strong> {inst.cnpj} <br />
                                </li>
                            ))
                    ) : (
                        <li>Nenhuma instituição cadastrada.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
