// Importando o arquivo de estilos CSS
import './styles.css';

// Definindo o componente funcional LayoutComponents
export const LayoutComponents = (props) => {
    return (
        // O contêiner principal onde todo o conteúdo será envolvido
        <div className="container">
            
            {/* Subcontêiner específico para o layout de login */}
            <div className="container-login">
                
                {/* Outro subcontêiner que envolve o conteúdo do login */}
                <div className="wrap-login">
                    
                    {/* Aqui, estamos rendendo os filhos (conteúdo) passados para o componente */}
                    {props.children}
                </div>
            </div>
        </div>
    );
}
