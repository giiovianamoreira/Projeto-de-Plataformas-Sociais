// Importa o React, useState, useEffect e a instância da API para fazer requisições
import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';

export const AdminInstitutionList = () => {
    // Estado para armazenar as instituições pendentes
    const [pendingInstitutions, setPendingInstitutions] = useState([]);

    // useEffect para chamar a função de busca de instituições pendentes assim que o componente for montado
    useEffect(() => {
        fetchPendingInstitutions(); // Chama a função que busca as instituições pendentes
    }, []);  // O array vazio indica que esse efeito será executado apenas uma vez, após o primeiro render

    // Função para buscar as instituições pendentes da API
    const fetchPendingInstitutions = async () => {
        try {
            // Faz uma requisição GET para buscar as instituições pendentes
            const response = await api.get('/institutions/pending', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`, // Envia o token de autenticação no cabeçalho
                },
            });
            // Atualiza o estado com as instituições pendentes recebidas da resposta da API
            setPendingInstitutions(response.data.pendingInstitutions); // Corrigido para pegar as instituições pendentes
        } catch (error) {
            console.error('Erro ao buscar instituições pendentes', error); // Exibe erro no console caso a requisição falhe
        }
    };

    // Função para aprovar uma instituição, chamada quando o botão "Aprovar" é clicado
    const verifyInstitution = async (id) => {
        try {
            // Faz uma requisição PATCH para aprovar a instituição
            await api.patch(`/institution/verify/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`, // Envia o token de autenticação
                },
            });
            // Após aprovar, chama novamente a função para buscar as instituições pendentes e atualizar a lista
            fetchPendingInstitutions();
        } catch (error) {
            console.error('Erro ao verificar instituição', error); // Exibe erro no console caso a requisição falhe
        }
    };

    // Função para rejeitar uma instituição, chamada quando o botão "Rejeitar" é clicado
    const rejectInstitution = async (id) => {
        try {
            // Faz uma requisição PATCH para rejeitar a instituição
            await api.patch(`/institution/reject/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`, // Envia o token de autenticação
                },
            });
            // Após rejeitar, chama novamente a função para buscar as instituições pendentes e atualizar a lista
            fetchPendingInstitutions();
        } catch (error) {
            console.error('Erro ao rejeitar instituição', error); // Exibe erro no console caso a requisição falhe
        }
    };

    return (
        <div>
            <h1>Instituições Pendentes</h1> {/* Título da página */}
            <ul>
                {/* Verifica se o array de instituições pendentes existe e contém dados */}
                {Array.isArray(pendingInstitutions) && pendingInstitutions.length > 0 ? (
                    // Mapeia as instituições pendentes e exibe cada uma com seus dados
                    pendingInstitutions.map((institution) => (
                        <li key={institution.id}>
                            <strong>{institution.nome}</strong> - {institution.cidade}, {institution.estado}
                            {/* Botões para aprovar ou rejeitar a instituição */}
                            <button onClick={() => verifyInstitution(institution.id)}>Aprovar</button>
                            <button onClick={() => rejectInstitution(institution.id)}>Rejeitar</button>
                        </li>
                    ))
                ) : (
                    // Caso não haja instituições pendentes, exibe uma mensagem
                    <p>Nenhuma instituição pendente.</p>
                )}
            </ul>
        </div>
    );
};
