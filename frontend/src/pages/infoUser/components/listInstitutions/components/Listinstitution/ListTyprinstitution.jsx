import { useEffect, useState } from "react";
import { api } from "../../services/api"; // Supondo que você tenha um serviço de API configurado

export const ListtypeInstitution = () => {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    // Função para buscar as instituições aprovadas
    const fetchInstitutions = async () => {
      try {
        const response = await api.get("/institutions?status=approved"); // Supondo que a API tenha um endpoint para isso
        setInstitutions(response.data);
      } catch (error) {
        console.error("Erro ao carregar as instituições", error);
      }
    };

    fetchInstitutions();
  }, []);

  return (
    <div className="list-type-institution">
      <div className="type-institution">
        <p>Aprovadas</p>
        <div className="container-institution">
          {/* Verifica se há instituições e as exibe */}
          {institutions.length > 0 ? (
            institutions.map((institution) => (
              <div key={institution.id} className="institution-card">
                <h3>{institution.nome}</h3>
                <p>{institution.endereco}</p>
                <p>{institution.cnpj}</p>
                {/* Pode adicionar mais informações aqui */}
              </div>
            ))
          ) : (
            <p>Não há instituições aprovadas.</p>
          )}
        </div>
      </div>
    </div>
  );
};
