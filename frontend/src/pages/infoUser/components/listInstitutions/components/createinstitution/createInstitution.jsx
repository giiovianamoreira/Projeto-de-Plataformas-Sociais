
import { Link } from "react-router-dom";
import'./index.css'
export const CreateInstitutionCard = () => {
 

    return (
        <div className="container-create-institution">
            <p>CADASTRAR NOVA INSTITUIÇÃO?</p>
            <Link to="/institution-create" className="button2 create-institution">cadastrar</Link>
        </div>
    );
};
