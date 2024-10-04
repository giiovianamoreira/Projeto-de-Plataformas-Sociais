import React from 'react';

export const EnderecoInsti = ({
  rua, setRua,
  numero, setNumero,
  complemento, setComplemento,
  bairro, setBairro,
  cidade, setCidade,
  estado, setEstado,
  cep, setCep
}) => {

  const checkCEP = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, '');
    setCep(cepValue); // Atualiza o estado do CEP
    if (cepValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setRua(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
        } else {
          console.error('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP', error);
      }
    }
  };

  return (
    <div>
      <div>
        <label>CEP</label>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={checkCEP}
          required
        />
      </div>
      <div>
        <label>Rua</label>
        <input
          type="text"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Número</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Complemento</label>
        <input
          type="text"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </div>
      <div>
        <label>Bairro</label>
        <input
          type="text"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cidade</label>
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Estado</label>
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />
      </div>
    </div>
  );
};
