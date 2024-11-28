// Importa o componente `Link` do `react-router-dom` para navegação entre páginas
import { Link } from "react-router-dom";
// Importa o arquivo de estilos CSS para o componente
import './index.css'

// Componente `CreateInstitutionCard`, que exibe uma interface para cadastrar uma nova instituição
export const CreateInstitutionCard = () => {
    return (
        // Container que envolve o conteúdo do card de criação da instituição
        <div className="container-create-institution">
            {/* Texto que pergunta se o usuário deseja cadastrar uma nova instituição */}
            <p>CADASTRAR NOVA INSTITUIÇÃO?</p>
            
            {/* Link que redireciona para a página de cadastro de nova instituição */}
            {/* `to="/institution-create"` especifica o destino do redirecionamento */}
            {/* `className="button2 create-institution"` aplica estilos personalizados ao botão */}
            <Link to="/institution-create" className="button2 create-institution">
                cadastrar
            </Link>
        </div>
    );
};
