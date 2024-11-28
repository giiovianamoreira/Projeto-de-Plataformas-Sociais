import { useState } from "react"; // Importa o hook useState do React para gerenciar o estado do componente
import { LayoutComponents } from "../../components/layoutComponents" // Importa o componente LayoutComponents, que envolve o conteúdo da página
import { Link } from "react-router-dom"; // Importa o componente Link do react-router-dom para navegação sem recarregar a página
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate do react-router-dom para navegação programática
import { api } from "../../services/api"; // Importa a instância de api configurada para fazer requisições HTTP

import './register.css';

export const Register = () => {
    const navigate = useNavigate(); // Inicializa o hook useNavigate para navegar entre páginas programaticamente
    const [email, setEmail] = useState(""); // Define o estado para armazenar o email do usuário
    const [password, setPassword] = useState(""); // Define o estado para armazenar a senha do usuário
    const [name, setName] = useState(""); // Define o estado para armazenar o nome do usuário
    // comunicando com api
    const handleSaveUser = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        const data = { email, password, name }; // Cria um objeto 'data' com as informações do formulário
        const response = await api.post("/create", data); // Faz uma requisição POST para criar o usuário na API
        console.log(response.data); // Loga a resposta da API no console (informações retornadas)
        navigate('/login'); // Redireciona o usuário para a página de login após sucesso no cadastro
    }
    
    return (
        <LayoutComponents> {/* Envolvendo o conteúdo da página no componente LayoutComponents */}
            <form className="form-group" onSubmit={handleSaveUser}> {/* Formulário com a classe CSS 'login-form' e evento onSubmit ligado à função handleSaveUser */}
                <span className="login-form-title"> Registrar </span> {/* Título do formulário */}

                <div className="wrap-input"> {/* Container para o campo de nome */}
                    <input
                        className={name !== "" ? "has-val input" : "input"} // Adiciona a classe 'has-val' se o campo de nome não estiver vazio
                        type="text"
                        value={name} // Define o valor do input com o estado 'name'
                        onChange={(e) => setName(e.target.value)} // Atualiza o estado 'name' conforme o usuário digita
                    />
                    <span className="focus-input" data-placeholder="Nome"></span> {/* Placeholder flutuante */}
                </div>

                <div className="wrap-input"> {/* Container para o campo de email */}
                    <input
                        className={email !== "" ? "has-val input" : "input"} // Adiciona a classe 'has-val' se o campo de email não estiver vazio
                        type="email"
                        value={email} // Define o valor do input com o estado 'email'
                        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email' conforme o usuário digita
                    />
                    <span className="focus-input" data-placeholder="Email"></span> {/* Placeholder flutuante */}
                </div>

                <div className="wrap-input"> {/* Container para o campo de senha */}
                    <input
                        className={password !== "" ? "has-val input" : "input"} // Adiciona a classe 'has-val' se o campo de senha não estiver vazio
                        type="password"
                        value={password} // Define o valor do input com o estado 'password'
                        onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password' conforme o usuário digita
                    />
                    <span className="focus-input" data-placeholder="Password"></span> {/* Placeholder flutuante */}
                </div>

                <div className="container-login-form-btn">
                    <button type="submit" className="submit-btn">Criar Conta</button> {/* Botão para submeter o formulário */}
                </div>

                <div className="text-center"> {/* Link para a página de login */}
                    <span className="txt1">Já possui conta? </span>
                    <Link className="txt2" to="/login">
                        Acessar com Email e Senha.
                    </Link>
                </div>
            </form>
        </LayoutComponents>
    )
}

