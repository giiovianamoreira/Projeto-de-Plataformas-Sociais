// Importação de componentes e funções necessários
import { Link, Navigate } from "react-router-dom"; // Link para navegação de páginas e Navigate para redirecionamento
import { useState } from "react"; // Hook do React para gerenciar estados

// Importação de uma imagem usada no layout
import jpIMG from "../../assets/jp.svg"; 

// Importação do contexto de autenticação e dos componentes do layout
import { useContext } from "react"; // Hook do React para acessar o contexto
import { AuthContext } from "../../context/auth"; // Contexto de autenticação
import { LayoutComponents } from "../../components/layoutComponents"; // Componente de layout da página (pode ser um template geral)

import './login.css'
export const Login = () => {
  // Definição dos estados locais para o email e senha
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  // Acessando o contexto de autenticação e pegando a função 'signIn' e o estado 'signed'
  const { signIn, signed } = useContext(AuthContext); 

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página ao submeter o formulário

    // Dados que serão enviados para o login
    const data = {
      email,
      password,
    };

    // Chama a função 'signIn' do contexto de autenticação passando os dados
    await signIn(data);
  };

  
    // Se o usuário NÃO estiver autenticado (signed é false ou não definido)
    if (!signed) {
      return (
        <LayoutComponents> {/* Componente de layout geral */}
          <form onSubmit={handleSubmit} className="login-form"> {/* Formulário de login */}
            <span className="login-form-title"> Bem vindo </span> {/* Título do formulário */}
  
            {/* Logo ou imagem (pode ser o logo da empresa ou app) */}
            <span className="login-form-title">
              <img src={jpIMG} alt="Jovem Programador" /> 
            </span>
  
            {/* Campo de entrada para o email */}
            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"} // Condicional para aplicar um estilo diferente se o campo não estiver vazio
                type="email" // Tipo do campo de entrada (email)
                value={email} // Valor do estado de email
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email ao digitar
              />
              <span className="focus-input" data-placeholder="Email"></span> {/* Placeholder para o campo */}
            </div>
  
            {/* Campo de entrada para a senha */}
            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"} // Condicional para aplicar um estilo diferente se o campo não estiver vazio
                type="password" // Tipo do campo de entrada (senha)
                value={password} // Valor do estado de senha
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha ao digitar
              />
              <span className="focus-input" data-placeholder="Password"></span> {/* Placeholder para o campo */}
            </div>
  
            {/* Botão de envio do formulário */}
            <div className="container-login-form-btn">
              <button type="submit" className="login-form-btn"> {/* Botão de Login */}
                Login
              </button>
            </div>
  
            {/* Link para página de registro, caso o usuário não tenha uma conta */}
            <div className="text-center">
              <span className="txt1">Não possui conta? </span> {/* Texto explicativo */}
              <Link className="txt2" to="/register"> {/* Link para a página de registro */}
                Criar conta.
              </Link>
            </div>
          </form>
        </LayoutComponents>
      );
    } else {
      // Se o usuário estiver autenticado (signed é true), redireciona para a página "/infouser"
      return <Navigate to="/infouser" />;
    }
  };  