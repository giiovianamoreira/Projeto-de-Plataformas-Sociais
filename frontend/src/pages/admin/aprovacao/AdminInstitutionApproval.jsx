import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';

export const AdminInstitutionList = () => {
    const [pendingInstitutions, setPendingInstitutions] = useState([]);

    useEffect(() => {
        fetchPendingInstitutions();
    }, []);

    const fetchPendingInstitutions = async () => {
        try {
            const response = await api.get('/institutions/pending', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
                },
            });
            setPendingInstitutions(response.data.pendingInstitutions); // Corrigido aqui
        } catch (error) {
            console.error('Erro ao buscar instituições pendentes', error);
        }
    };


    const verifyInstitution = async (id) => {
        try {
            await api.patch(`/institution/verify/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
                },
            });
            fetchPendingInstitutions(); // Atualiza a lista após a verificação
        } catch (error) {
            console.error('Erro ao verificar instituição', error);
        }
    };

    const rejectInstitution = async (id) => {
        try {
            await api.patch(`/institution/reject/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
                },
            });
            fetchPendingInstitutions(); // Atualiza a lista após a rejeição
        } catch (error) {
            console.error('Erro ao rejeitar instituição', error);
        }
    };

    return (
        <div>
            <h1>Instituições Pendentes</h1>
            <ul>
                {Array.isArray(pendingInstitutions) && pendingInstitutions.length > 0 ? (
                    pendingInstitutions.map((institution) => (
                        <li key={institution.id}>
                            <strong>{institution.nome}</strong> - {institution.cidade}, {institution.estado}
                            <button onClick={() => verifyInstitution(institution.id)}>Aprovar</button>
                            <button onClick={() => rejectInstitution(institution.id)}>Rejeitar</button>
                        </li>
                    ))
                ) : (
                    <p>Nenhuma instituição pendente.</p>
                )}
            </ul>
        </div>
    );
};


