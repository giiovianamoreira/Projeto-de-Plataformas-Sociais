// src/components/BasicInfos.jsx

import React from 'react';

export const BasicInfos = ({ nome, setNome, cnpj, setCnpj }) => {
  return (
    <div>
      <div>
        <label>Nome</label>
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>CNPJ</label>
        <input 
          type="text" 
          value={cnpj} 
          onChange={(e) => setCnpj(e.target.value)} 
          required 
        />
      </div>
    </div>
  );
};
