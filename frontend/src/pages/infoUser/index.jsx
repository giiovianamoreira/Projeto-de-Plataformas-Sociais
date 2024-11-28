import { Component, useContext, useState } from "react";  // Importação de dependências do React
import { AuthContext } from "../../context/auth";  // Importando o contexto de autenticação (AuthContext)
import './styles.css'  // Importação do arquivo de estilos CSS
import { MenuLateral } from "./components/menu/menuLateral";  // Componente de menu lateral
import { Component1 } from "./components/infouser/infoUser";  // Componente que exibe informações do usuário
import { Component2 } from "./components/listInstitutions/ListInstitution";  // Componente que lista instituições
import { Link } from "react-router-dom";  // Link para navegação entre páginas no React Router
import '../infoUser/styles.css';

export const InfoUser = () => {
  
  // Estado para controlar qual item do menu está selecionado
  const [selectedItem, setSelectedItem] = useState(1);  

  // Acessando o contexto de autenticação para manipular os dados do usuário
  const { user, signOut, deleteUserAccount, updateUser } = useContext(AuthContext);

  // Estados para armazenar e editar o nome, email e senha do usuário
  const [name, setName] = useState(user?.name || "");  
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");  // A senha não vem do contexto, por ser um dado sensível

  // Função para excluir a conta do usuário
  const handleDeleteAccount = () => {
    deleteUserAccount();  // Chama a função de exclusão da conta
  };

  // Função para atualizar os dados do usuário
  const handleUpdate = async (e) => {
    e.preventDefault();  // Evita o comportamento padrão de um form (recarregar a página)
    await updateUser({ name, email, password });  // Atualiza o usuário com os dados modificados
  };

  // Função que renderiza o componente com base no item selecionado no menu
  const renderComponent = () => {
    switch (selectedItem) {
      case 1:
        return <Component1 />;  // Renderiza o componente de informações do usuário
      case 2:
        return <Component2 />;  // Renderiza o componente de lista de instituições
      // Aqui podem ser adicionados outros casos conforme a necessidade
      default:
        return <div>Selecione um item do menu.</div>;  // Caso nenhum item seja selecionado
    }
  };

  return (
    <div className="general-container">
      {/* Menu lateral que permite selecionar diferentes componentes */}
      <div className="container-mananger"> 
        <MenuLateral onSelect={setSelectedItem} />  {/* Passa a função setSelectedItem para o MenuLateral */}
      </div>

      <div className="line-separator"></div>  {/* Separador visual entre o menu e o conteúdo */}
      
      {/* Contêiner que vai exibir o componente correspondente à opção selecionada */}
      <div className="container-mananger">
        {renderComponent()}  {/* Renderiza o componente com base no item selecionado */}
      </div>

      {/* Link para navegar até uma página de criação de instituição */}
      <Link className="txt2" to="/institution-create">
        teste
      </Link>

      {/* Link para voltar à página principal */}
      <Link to="/">VOLTAR</Link>
    </div>
  );
};
