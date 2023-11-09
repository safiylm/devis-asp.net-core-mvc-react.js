import React, {  useState } from 'react';
import '../../../styles/FormListeClientEntreprise.css';

const ListeEntreprise = () => {

    const [entreprises, setEntreprise] = useState([])

    fetch('http://localhost:44453/Client/getAll')
        .then((res) => res.json())
        .then((data) => setEntreprise(data));


    return (
        <div className="ListeEntreprise">
           

            {(entreprises.length > 0) ?
                entreprises.map((item) => (
                        <div className="divEntreprise" key={item.id}>

                            <p>{item.nom} {item.prenom}</p>
                            <p> {item.email}</p>

                        </div>))
                : <p> Chargement des entreprises ...</p>}
          
           
           
        </div>
    );
    }



export default ListeEntreprise;