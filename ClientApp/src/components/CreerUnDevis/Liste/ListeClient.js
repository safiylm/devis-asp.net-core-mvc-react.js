import React, {  useState } from 'react';
import '../../../styles/FormListeClientEntreprise.css';

const SaisirUnClient = () => {

    const [clients , setClient] = useState([])

    fetch('http://localhost:44453/Client/getAll')
        .then((res) => res.json())
        .then((data) => setClient(data));

    return (
        <div className="ListeClient">
           
            {(clients.length > 0) ?  
                clients.map((item) => (
                    <div className="divClient" key={item.id}>

                        <p>{item.nom} {item.prenom}</p>
                        <p> {item.email}</p>
                       
                    </div>))
                : <p> Chargement des clients ...</p>}
        </div>
    );
}

export default SaisirUnClient;


