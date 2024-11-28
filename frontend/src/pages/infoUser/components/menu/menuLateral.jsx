// Componente MenuLateral que recebe a função onSelect como prop
import './menulateral.css';
export const MenuLateral = ({ onSelect }) => {
    return (
        <div className="menu-container"> {/* Contêiner principal do menu lateral */}
            
            {/* Opção do menu "Meu Perfil", ao ser clicada chama a função onSelect passando o valor 1 */}
            <div className="menu-option" onClick={() => onSelect(1)}>
                Meu Perfil
            </div>
            
            {/* Opção do menu "Cadastrar instituições", ao ser clicada chama a função onSelect passando o valor 2 */}
            <div className="menu-option" onClick={() => onSelect(2)}>
                Cadastrar instituições
            </div>

        </div>
    );
}
