
// Importe outros componentes...

export const MenuLateral = ({ onSelect }) => {
    return (
        <div className="menu-container">
            <div className="menu-option" onClick={() => onSelect(1)}>Meu Perfil</div>
            <div className="menu-option" onClick={() => onSelect(2)}>Minhas instituições</div>
            <div className="menu-option" onClick={() => onSelect(3)}>Opção 3</div>
            <div className="menu-option" onClick={() => onSelect(4)}>Opção 4</div>
            <div className="menu-option" onClick={() => onSelect(5)}>Opção 5</div>
            <div className="menu-option" onClick={() => onSelect(6)}>Opção 6</div>
        </div>
    );
}

