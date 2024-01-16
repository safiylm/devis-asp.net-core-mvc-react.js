import React, {  useState } from 'react';
import '../../../styles/FormListeClientEntreprise.css';

const ListeEntreprise = ({ setIdEntreprise, changeNumEtape }) => {

    const [entreprises, setEntreprise] = useState([])
 

    fetch('http://localhost:44453/Entreprise/getAll')
        .then((res) => res.json())
        .then((data) => setEntreprise(data));


    const onChange = (e) => {
       
        alert(e.target.value)
        setIdEntreprise(e.target.value)
        changeNumEtape(2);
    }

    return (
        <form >
            <div className="ListeEntreprise">
           
                {(entreprises.length > 0) ?
                    entreprises.map((item) => (
                        <div key={item.id}>
                            <label>
                                <input type="radio" name="entreprisechoose"
                                    onChange={onChange} value={item.id} />
                                    {item.nom} {item.ville} {item.email}
                           
                            </label>
                        </div>
                ))
                : <p> Chargement des entreprises ...</p>}
            </div>

            <button type="submit" className="btn btn-success"> Envoyer </button>
        </form>
    );
}

export default ListeEntreprise;