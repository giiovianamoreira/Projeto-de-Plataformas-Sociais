import React, { useState, useEffect ,useRef} from 'react';
import { useInstitution } from '../../context/institutionContext';
import { useNavigate } from 'react-router-dom';
import './index.css'
export const InstitutionRegister = () => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setendereco] = useState('');
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
  const [fotos, setFotos] = useState([[null, null, null, null, null]]); // Alterado para um array
  const fileInputRefs = useRef([]);
  const { registerInstitution, fetchInstitutions } = useInstitution();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  const handleFotoChange = (e, index) => {
    const file = e.target.files[0];
    const updatedFotos = [...fotos];
    updatedFotos[index] = file;
    setFotos(updatedFotos);
  };
  const handleSubmit = (e) => {
    e.preventDefault();


    const selectedFotos = fotos.filter(foto => foto !== null); // Filtra os arquivos não nulos
    if (selectedFotos.length < 2 || selectedFotos.length > 5) {
      alert("Selecione entre 2 e 5 fotos.");
      return;
    }

    const institutionData = new FormData();
    institutionData.append('nome', nome);
    institutionData.append('cnpj', cnpj);
    institutionData.append('rua', rua);
    institutionData.append('numero', numero);
    institutionData.append('complemento', complemento);
    institutionData.append('bairro', bairro);
    institutionData.append('cidade', cidade);
    institutionData.append('estado', estado);
    institutionData.append('endereco', endereco);
    institutionData.append('cep', cep);
    institutionData.append('telefone', telefone);
    institutionData.append('email', email);
    institutionData.append('website', website);
    institutionData.append('facebook', facebook);
    institutionData.append('instagram', instagram);
    institutionData.append('linkedin', linkedin);
    institutionData.append('descricao', descricao);
    institutionData.append('areasAtuacao', areasAtuacao);
    institutionData.append('publicoAlvo', publicoAlvo);
    institutionData.append('projetos', projetos);
    institutionData.append('nomeResponsavel', nomeResponsavel);
    institutionData.append('horarioFuncionamento', horarioFuncionamento);

    // Adiciona as fotos ao FormData
    fotos.forEach((foto) => {
      institutionData.append('foto', foto); // Use 'fotos' como chave
    });

    // Chama a função para registrar a instituição
    registerInstitution(institutionData);

    // Limpa os campos após o envio
    setNome('');
    setCnpj('');
    setRua('');
    setendereco('');
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
    setFotos([null, null, null, null, null]); // Reseta os campos de fotos

    // Limpa os inputs de arquivos
    fileInputRefs.current.forEach((input) => {
      if (input) {
        input.value = ''; // Limpa o valor do input
      }
    });
  };

  const handleCreateEvent = (institutionId) => {
    localStorage.setItem('institutionId', institutionId);
    navigate('/create-event');
  };

  return (
    <div className="container">
      <div className="modal">
        <div className="modal__header">
          <span className="modal__title">Cadastro de Instituição</span>
          <button className="button button--icon" navigate='/'>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
            </svg>
          </button>
        </div>
        <div className="modal__body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input">
              <label className="input__label">Nome da Instituição</label>
              <input
                className="input__field"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">CNPJ</label>
              <input
                className="input__field"
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Endereço</label>
              <input
                className="input__field"
                type="text"
                value={endereco}
                onChange={(e) => setendereco(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Rua</label>
              <input
                className="input__field"
                type="text"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Número</label>
              <input
                className="input__field"
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Complemento</label>
              <input
                className="input__field"
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Bairro</label>
              <input
                className="input__field"
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Cidade</label>
              <input
                className="input__field"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Estado</label>
              <input
                className="input__field"
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">CEP</label>
              <input
                className="input__field"
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Telefone</label>
              <input
                className="input__field"
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Email</label>
              <input
                className="input__field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Website</label>
              <input
                className="input__field"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Facebook</label>
              <input
                className="input__field"
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Instagram</label>
              <input
                className="input__field"
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">LinkedIn</label>
              <input
                className="input__field"
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Descrição</label>
              <textarea
                className="input__field input__field--textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Áreas de Atuação</label>
              <input
                className="input__field"
                type="text"
                value={areasAtuacao}
                onChange={(e) => setAreasAtuacao(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Público Alvo</label>
              <input
                className="input__field"
                type="text"
                value={publicoAlvo}
                onChange={(e) => setPublicoAlvo(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Projetos</label>
              <input
                className="input__field"
                type="text"
                value={projetos}
                onChange={(e) => setProjetos(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Nome do Responsável</label>
              <input
                className="input__field"
                type="text"
                value={nomeResponsavel}
                onChange={(e) => setNomeResponsavel(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="input__label">Horário de Funcionamento</label>
              <input
                className="input__field"
                type="text"
                value={horarioFuncionamento}
                onChange={(e) => setHorarioFuncionamento(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Fotos da Instituição (2 a 5 fotos)</label>
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  className="input__field"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleFotoChange(e, index)}
                  ref={(el) => (fileInputRefs.current[index] = el)}
                />
              ))}
            </div>
            <div className="modal__footer">
              <button className="button button--primary" type="submit">Cadastrar Instituição</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
