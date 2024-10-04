import React, { useState, useEffect } from 'react';
import { useInstitution } from '../../context/institutionContext';
import { BasicInfos } from './components/BasicInfo';
import { EnderecoInsti } from './components/Address';
import { useNavigate } from 'react-router-dom'; // Para navegação

export const InstitutionRegister = () => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [descricao, setDescricao] = useState('');
  const [areasAtuacao, setAreasAtuacao] = useState('');
  const [publicoAlvo, setPublicoAlvo] = useState('');
  const [projetos, setProjetos] = useState('');
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [horarioFuncionamento, setHorarioFuncionamento] = useState('');
  const { registerInstitution, fetchInstitutions, institutions } = useInstitution();
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    fetchInstitutions(); // Carrega as instituições ao montar o componente
  }, [fetchInstitutions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const institutionData = {
      nome,
      cnpj,
      endereco,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      telefone,
      email,
      website,
      facebook,
      instagram,
      linkedin,
      descricao,
      areasAtuacao,
      publicoAlvo,
      projetos,
      nomeResponsavel,
      horarioFuncionamento,
    };

    registerInstitution(institutionData);

    // Limpa os campos após o envio
    setNome('');
    setCnpj('');
    setEndereco('');
    setRua('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setEstado('');
    setCep('');
    setTelefone('');
    setEmail('');
    setWebsite('');
    setFacebook('');
    setInstagram('');
    setLinkedin('');
    setDescricao('');
    setAreasAtuacao('');
    setPublicoAlvo('');
    setProjetos('');
    setNomeResponsavel('');
    setHorarioFuncionamento('');
  };

  const handleCreateEvent = (institutionId) => {
    // Armazenar o id da instituição no localStorage
    localStorage.setItem('institutionId', institutionId);
    navigate('/create-event'); // Redireciona para a página de criar evento
  };

  return (
    <div>
      <h1>Cadastro de Instituição</h1>
      <form onSubmit={handleSubmit}>
        <BasicInfos 
          nome={nome}
          setNome={setNome}
          cnpj={cnpj}
          setCnpj={setCnpj}
        />
        <EnderecoInsti
          rua={rua}
          setRua={setRua}
          numero={numero}
          setNumero={setNumero}
          complemento={complemento}
          setComplemento={setComplemento}
          bairro={bairro}
          setBairro={setBairro}
          cidade={cidade}
          setCidade={setCidade}
          estado={estado}
          setEstado={setEstado}
          cep={cep}
          setCep={setCep}
        />
        <div>
          <label>Endereço</label>
          <input 
            type="text" 
            value={endereco} 
            onChange={(e) => setEndereco(e.target.value)} 
            required 
          />
        </div>
      
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Instituições Cadastradas</h2>
      <ul>
        {institutions.map((inst) => (
          <li key={inst.id}>
            <strong>Nome:</strong> {inst.nome} <br />
            <strong>CNPJ:</strong> {inst.cnpj} <br />
          
            <button onClick={() => handleCreateEvent(inst.id)}>
              Criar Evento
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
