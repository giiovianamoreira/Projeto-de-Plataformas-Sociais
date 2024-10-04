import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth";
export const Component1= () =>
    {

        const { user, signOut, deleteUserAccount, updateUser } = useContext(AuthContext);
        const [name, setName] = useState(user?.name || "");
        const [email, setEmail] = useState(user?.email || "");
        const [password, setPassword] = useState("");
      
        const handleDeleteAccount = () => {
          deleteUserAccount();
        };
      
        const handleUpdate = async (e) => {
          e.preventDefault();
          await updateUser({ name, email, password });
        };
        return(
            <div className="menu-container">
            <h1>Home</h1>
            {user ? (
              <>
                <span>Bem-vindo, {user.name}</span>
                <button onClick={signOut}>Logout</button>
                <button onClick={handleDeleteAccount}>Deletar Conta</button>
              </>
            ) : (
              <span>Carregando...</span>
            )}
            <div>
            <h1>Home</h1>
            <span>Bem-vindo, {user?.name}</span>
            
            <form onSubmit={handleUpdate}>
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Senha:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Atualizar</button>
            </form>
      
            <button onClick={signOut}>Sair</button>
          </div>
          </div>
        ) 
        
    }