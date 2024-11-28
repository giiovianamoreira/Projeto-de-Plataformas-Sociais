import React from 'react';

export const EnderecoInsti = ({
  rua, setRua,            // Estado e função para atualizar a rua
  numero, setNumero,      // Estado e função para atualizar o número
  complemento, setComplemento, // Estado e função para atualizar o complemento
  bairro, setBairro,      // Estado e função para atualizar o bairro
  cidade, setCidade,      // Estado e função para atualizar a cidade
  estado, setEstado,      // Estado e função para atualizar o estado
  cep, setCep             // Estado e função para atualizar o CEP
}) => {

  // Função para verificar e preencher os dados do endereço com base no CEP
  const checkCEP = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    setCep(cepValue); // Atualiza o estado do CEP
    if (cepValue.length === 8) { // Verifica se o CEP tem 8 caracteres (formato correto)
      try {
        // Faz uma requisição à API ViaCEP para obter os dados do endereço
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json(); // Converte a resposta em JSON

        if (!data.erro) { // Verifica se o CEP foi encontrado
          setRua(data.logradouro); // Atualiza a rua com o dado retornado
          setBairro(data.bairro);   // Atualiza o bairro com o dado retornado
          setCidade(data.localidade); // Atualiza a cidade com o dado retornado
          setEstado(data.uf);       // Atualiza o estado com o dado retornado
        } else {
          console.error('CEP não encontrado'); // Caso o CEP não exista, exibe erro no console
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP', error); // Exibe erro caso a requisição falhe
      }
    }
  };

  return (
    <div>
      {/* Campo para o CEP */}
      <div>
        <label>CEP</label>
        <input
          type="text"
          value={cep}  // Valor do estado do CEP
          onChange={(e) => setCep(e.target.value)}  // Atualiza o estado do CEP
          onBlur={checkCEP}  // Chama a função checkCEP ao sair do campo (onBlur)
          required
        />
      </div>

      {/* Campo para a Rua */}
      <div>
        <label>Rua</label>
        <input
          type="text"
          value={rua}  // Valor do estado da rua
          onChange={(e) => setRua(e.target.value)}  // Atualiza o estado da rua
          required
        />
      </div>

      {/* Campo para o Número */}
      <div>
        <label>Número</label>
        <input
          type="text"
          value={numero}  // Valor do estado do número
          onChange={(e) => setNumero(e.target.value)}  // Atualiza o estado do número
          required
        />
      </div>

      {/* Campo para o Complemento */}
      <div>
        <label>Complemento</label>
        <input
          type="text"
          value={complemento}  // Valor do estado do complemento
          onChange={(e) => setComplemento(e.target.value)}  // Atualiza o estado do complemento
        />
      </div>

      {/* Campo para o Bairro */}
      <div>
        <label>Bairro</label>
        <input
          type="text"
          value={bairro}  // Valor do estado do bairro
          onChange={(e) => setBairro(e.target.value)}  // Atualiza o estado do bairro
          required
        />
      </div>

      {/* Campo para a Cidade */}
      <div>
        <label>Cidade</label>
        <input
          type="text"
          value={cidade}  // Valor do estado da cidade
          onChange={(e) => setCidade(e.target.value)}  // Atualiza o estado da cidade
          required
        />
      </div>

      {/* Campo para o Estado */}
      <div>
        <label>Estado</label>
        <input
          type="text"
          value={estado}  // Valor do estado do estado
          onChange={(e) => setEstado(e.target.value)}  // Atualiza o estado do estado
          required
        />
      </div>
    </div>
  );
};
