// src/components/BasicInfos.jsx

import React from 'react';

// Componente BasicInfos, que recebe 'nome', 'setNome', 'cnpj' e 'setCnpj' como props
export const BasicInfos = ({ nome, setNome, cnpj, setCnpj }) => {
  return (
    <div>
      <div>
        <label>Nome</label> 
        <input 
          type="text"  /* Tipo de entrada de texto */
          value={nome}  /* Valor do campo 'Nome', associado ao estado 'nome' */
          onChange={(e) => setNome(e.target.value)} /* Atualiza o estado 'nome' com o valor inserido */
          required /* Torna este campo obrigatório */
        />
      </div>

      {/* Campo para o CNPJ */}
      <div>
        <label>CNPJ</label>
        <input 
          type="text"/* Tipo de entrada de texto */
          value={cnpj}  /* Valor do campo 'CNPJ', associado ao estado 'cnpj' */
          onChange={(e) => setCnpj(e.target.value)}  /* Atualiza o estado 'cnpj' com o valor inserido */
          required  /* Torna este campo obrigatório */
        />
      </div>
    </div>
  );
};
