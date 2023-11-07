import React, { useState } from 'react';
import '../../styles/listedevis.css';
import MenuVerticale from '../MenuVerticale/MenuVerticale.js'

const ListeDevis = () => {
    const [deviss, setDevis] = useState([]);
    const [clients, setClients] = useState([]);
    //const [auteurs, setAuteurs] = useState([]);

    fetch('http://localhost:44453/Devis/GetAll')
        .then((res) => res.json()  )
        .then((data) => setDevis(data));

    fetch('http://localhost:44453/Client/GetById?id=1')
        .then((res) => res.json())
        .then((data) => setClients(data));

    //fetch('http://localhost:44453/Auteur/GetAll')
    //    .then((res) => res.json())
    //    .then((data) => setDevis(data));


    return (
        <div className="page-liste-devis">
            <MenuVerticale/>
        <div className="div-liste-devis">
              


                {(deviss.length > 0 && clients.length > 0 ?
                    
            <table>
                <thead>
                    <tr>
                        <th>N° de devis </th>
                        <th>Client</th>
                        <th>Montant HT</th>
                        <th>Montant TTC</th>
                        <th>Date du devis</th>
                        <th>Statut</th>

                    </tr>
                </thead>
                <tbody>
                    
                            {deviss.map(devis => (
                                <tr key={devis.id}>
                                    <td>{devis.id}</td>

                                    {clients.map(client => (
                                        <td key={client.id}> {client.prenom} {client.nom} </td>
                                    ))}

                                    <td>
                                        200$
                                    </td>

                                    <td>
                                        220$
                                    </td>
                                    <td>
                                        <a> {devis.dateCreation} </a>
                                    </td>
                                    <td>
                                        Devis / Bon de commande
                                    </td>
                                </tr>

                            ))}
                            
                           
                      
                  
                </tbody>
                    </table>

                    : <p>Chargement en cours ... </p>)}
        </div>
        </div>
    );

}

export default ListeDevis;