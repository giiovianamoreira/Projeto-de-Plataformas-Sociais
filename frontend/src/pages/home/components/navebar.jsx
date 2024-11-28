import React from "react";
import '../index.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">Conexão Solidária</div>
        <div className="nav-links">
          <a href="https://exemplo.com/instituicoes">Instituições</a>
          <a href="https://exemplo.com/doe">Doe Agora</a>
          <a href="https://exemplo.com/sobre">Sobre Nós</a>
          <a href="https://exemplo.com/contato">Contato</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;