// Importação dos hooks e funções necessárias do React e outras dependências
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

// Criando o contexto de autenticação, que permitirá compartilhar o estado de autenticação entre os componentes
export const AuthContext = createContext();

// Definindo o provedor de autenticação, que envolverá a aplicação e fornecerá os dados de autenticação para os componentes filhos
export const AuthProvider = ({ children }) => {
  // Estado que armazena os dados do usuário logado (inicia como null)
  const [user, setUser] = useState(null);

  // Efeito colateral para carregar os dados armazenados no localStorage quando o componente for montado
  useEffect(() => {
    const loadingStoreData = () => {
      // Recupera os dados do usuário e token armazenados no localStorage
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      // Se ambos os dados existirem no armazenamento, define o estado do usuário e configura o token no cabeçalho da API
      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));  // Converte o JSON armazenado de volta para o formato de objeto
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`; // Configura o token para ser enviado em todas as requisições
      }
    };
    loadingStoreData(); // Chama a função para carregar os dados armazenados
  }, []); // Esse efeito só será executado uma vez, quando o componente for montado

  // Função para realizar o login (signIn), que faz uma requisição POST para a API de autenticação
  const signIn = async ({ email, password }) => {
    try {
      // Realiza a requisição POST para autenticar o usuário
      const response = await api.post("/auth", { email, password });

      // Verifica se houve algum erro na resposta da API
      if (response.data.error) {
        alert(response.data.error); // Exibe um alerta caso haja erro
      } else {
        // Caso o login seja bem-sucedido, armazena o usuário e o token no estado e no localStorage
        setUser(response.data.user);
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
      }
    } catch (error) {
      console.log(error); // Exibe qualquer erro ocorrido no processo de login
    }
  };

  // Função para realizar o logout (signOut), que limpa o localStorage e o estado
  const signOut = () => {
    localStorage.clear(); // Limpa todos os dados do localStorage
    setUser(null); // Reseta o estado do usuário para null
    return <Navigate to="/" />; // Redireciona o usuário para a página inicial
  };

  // Função para deletar a conta do usuário, que faz uma requisição DELETE para a API
  const deleteUserAccount = async () => {
    try {
      // Realiza a requisição DELETE para excluir a conta do usuário
      await api.delete("/delete");

      // Após a exclusão, realiza o logout
      signOut();
      alert("Conta deletada com sucesso!"); // Exibe um alerta confirmando a exclusão
      return <Navigate to="/" />; // Redireciona o usuário para a página inicial
    } catch (error) {
      console.error("Erro ao deletar a conta:", error); // Exibe erro caso algo dê errado
      alert("Erro ao deletar a conta."); // Alerta ao usuário que houve um erro na exclusão
    }
  };

  // Função para atualizar os dados do usuário, que faz uma requisição PATCH para a API
  const updateUser = async (data) => {
    try {
      // Envia os dados do formulário para a API de atualização de usuário
      const response = await api.patch("/update", data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Define o tipo de conteúdo para upload de arquivos (caso seja necessário)
        },
      });

      // Verifica se a resposta contém o usuário atualizado
      if (response.data.user) {
        // Se sim, atualiza o estado e o localStorage com os novos dados do usuário
        setUser(response.data.user);
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
      } else {
        alert(response.data.error); // Caso haja erro, exibe a mensagem de erro
      }
      alert("Alterações salvas!"); // Exibe um alerta confirmando as alterações
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error); // Exibe erro caso algo dê errado
    }
  };

  // O AuthContext.Provider disponibiliza os valores que podem ser acessados pelos componentes filhos
  return (
    <AuthContext.Provider
      value={{
        user,                // Dados do usuário logado
        signIn,             // Função para fazer login
        signOut,            // Função para fazer logout
        deleteUserAccount,  // Função para deletar a conta
        updateUser,         // Função para atualizar os dados do usuário
        signed: !!user,     // Valor booleano que indica se o usuário está autenticado
      }}
    >
      {children}  {/* Renderiza os componentes filhos dentro do provedor */}
    </AuthContext.Provider>
  );
};
