import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));  // Parsear o JSON armazenado
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post("/auth", { email, password });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data.user);  // Armazenar apenas os dados do usuário no estado
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
        // localStorage.setItem("@Auth:status", "logado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  const deleteUserAccount = async () => {
    try {
      await api.delete("/delete");
      signOut();  // Faz logout após a exclusão
      alert("Conta deletada com sucesso!");
      return <Navigate to="/" />;
    } catch (error) {
      console.error("Erro ao deletar a conta:", error);
      alert("Erro ao deletar a conta.");
    }
  };

  const updateUser = async (data) => {
    try {
      // Envia o FormData para a rota de atualização
      const response = await api.patch("/update", data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Define o tipo de conteúdo para multipart/form-data
        },
      });
  
      // Verifica se a resposta contém um usuário atualizado
      if (response.data.user) {
        setUser(response.data.user); // Atualiza o usuário no estado
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user)); // Atualiza no localStorage
      } else {
        alert(response.data.error);
      }
      alert("alterações salvas")
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        deleteUserAccount,
        updateUser,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
