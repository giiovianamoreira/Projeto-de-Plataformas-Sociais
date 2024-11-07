import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/auth";
import './index.css';

export const Component1 = () => {
  const { user, signOut, deleteUserAccount, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null); // Para armazenar a foto

  const handleDeleteAccount = () => {
    deleteUserAccount();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) {
      formData.append('password', password);
    }
    if (photo) {
      formData.append('foto', photo); // Adiciona a foto ao FormData
    }
    
    await updateUser(formData);
  };

  // Função para lidar com o upload da foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // Armazena a foto no estado
    }
  };

  return (
    <div className="infouser-general">
      {user ? (
        <>
          <h2>Olá, {user.name}</h2>
          {/* Exibe a foto do usuário */}
          {user.foto && (
            <div className="user-photo">
              <img src={user.foto} alt="Foto do usuário" />
            </div>
          )}
        </>
      ) : (
        <span>Carregando...</span>
      )}
      <div className="forms-user-profile">
        <form onSubmit={handleUpdate}>
          <div className="label-l">
            <label>Nome de Usuário:</label>
            <label>Email:</label>
            <label>Senha:</label>
            <label>Foto:</label> {/* Novo rótulo para foto */}
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
              onChange={handlePhotoChange} // Atualiza a foto no estado
            />
          </div>
          <button type="submit" className="button2">ATUALIZAR</button>
        </form>
      </div>
      {user ? (
        <>
          <div className="text-logout-account">
            <p> Clique aqui para sair de sua conta. Isso encerrará sua sessão atual e você precisará fazer login novamente para acessar sua conta. </p>
            <button onClick={signOut} className="btn-logout-user">
              <span className="text">Sair</span>
              <span className="icon">
                <svg viewBox="0 0 512 512">
                  <path
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="text-delete-account">
            <p>Clique neste botão para remover permanentemente sua conta. Todos os dados associados serão excluídos e não poderão ser recuperados. Certifique-se de que esta é realmente a sua decisão. </p>
            <button onClick={handleDeleteAccount} className="btn-delete-user">
              <span className="text">Deletar</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
          </div>
        </>
      ) : (
        <span>Carregando...</span>
      )}
    </div>
  );
};
