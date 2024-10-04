import { Component, useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import './styles.css'
import { MenuLateral } from "./components/menuLateral";
import { Component1 } from "./components/infoUser";
import { Component2 } from "./components/teste";
import { Link } from "react-router-dom";
export const InfoUser = () => {

  const [selectedItem, setSelectedItem] = useState(1);


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

  const renderComponent = () => {
    switch (selectedItem) {
      case 1:
        return <Component1 />;
      case 2:
        return <Component2 />;
      // Adicione casos para os outros componentes...
      default:
        return <div>Selecione um item do menu.</div>;
    }
  };


  return (


    <div className="general-container">
      <div className="container-mananger"> <MenuLateral onSelect={setSelectedItem} /></div>

      <div className="line-separator"></div>
      <div className="container-mananger">
        {renderComponent()}
      </div>
      <Link className="txt2" to="/institution-create">
             teste
      </Link>
      <Link to="/">VOLTAR</Link>
    </div>




  );
};
