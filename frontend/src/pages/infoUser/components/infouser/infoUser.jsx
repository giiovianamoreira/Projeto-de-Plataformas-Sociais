import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/auth";
import './index.css';

export const Component1 = () => {
  const { user, signOut, deleteUserAccount, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null); 
  const [feedback, setFeedback] = useState(""); // Para exibir feedback

  const handleDeleteAccount = () => {
    if (window.confirm("Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.")) {
      deleteUserAccount()
        .then(() => setFeedback("Conta excluída com sucesso."))
        .catch(err => setFeedback("Erro ao excluir conta."));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!name || !email) {
      setFeedback("Nome e e-mail são obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) {
      formData.append('password', password);
    }
    if (photo) {
      formData.append('foto', photo);
    }

    try {
      await updateUser(formData);
      setFeedback("Informações atualizadas com sucesso!");
    } catch (error) {
      setFeedback("Erro ao atualizar perfil.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div className="infouser-general">
      {user ? (
        <>
          <h2>Olá, {user.name}</h2>
          {user.foto ? (
            <div className="user-photo">
              <img src={user.foto} alt="Foto do usuário" />
            </div>
          ) : (
            <div className="user-photo">
              <span>Sem foto de perfil</span>
            </div>
          )}
        </>
      ) : (
        <span>Carregando...</span>
      )}
      
      {feedback && <div className="feedback-message">{feedback}</div>}

      <div className="forms-user-profile">
        <form onSubmit={handleUpdate}>
          <div className="label-l">
            <label>Nome de Usuário:</label>
            <label>Email:</label>
            <label>Senha:</label>
            <label>Foto:</label>
          </div>
          <div className="input-r">
            <input
              className="input-user-profile"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input-user-profile"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input-user-profile"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <button type="submit" className="button2">ATUALIZAR</button>
        </form>
      </div>

      <div className="text-logout-account">
        <p> Clique aqui para sair de sua conta. Isso encerrará sua sessão atual e você precisará fazer login novamente para acessar sua conta. </p>
        <button onClick={signOut} className="btn-logout-user">
          <span className="text">Sair</span>
        </button>
      </div>

      <div className="text-delete-account">
        <p>Clique neste botão para remover permanentemente sua conta. Todos os dados associados serão excluídos e não poderão ser recuperados. Certifique-se de que esta é realmente a sua decisão.</p>
        <button onClick={handleDeleteAccount} className="btn-delete-user">
          <span className="text">Deletar</span>
        </button>
      </div>
    </div>
  );
};
