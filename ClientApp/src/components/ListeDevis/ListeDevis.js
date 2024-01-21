import React, { useState } from 'react';
import '../../styles/listedevis.css';
import { Navigate, Link } from "react-router-dom";



const ListeDevis = () => {
    const [deviss, setDevis] = useState([]);
    const [clients, setClients] = useState([]);
    const [show, setShow] = useState(false);
    const [generateIdDevis, setgenerateIdDevis] = useState(false);
    const [success, setSuccess] = useState(false);

    const hrefDataUsers = () => {
        document.location.href ="/MonCompte/MesDonneesPersonnelles"
    }
    const generateId = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const h = today.getHours();
        const m = today.getMinutes();
        const s = today.getSeconds();
        const ms = today.getMilliseconds();
        const currentDate = year + "-" + month + "-" + date + "-" + h + "-" + m + "" + s + "-" + ms;

        setgenerateIdDevis(currentDate + "-safi")
        setSuccess(true)
    }

    fetch('http://localhost:44453/Devis/GetAll')
        .then((res) => res.json()  )
        .then((data) => setDevis(data));

    fetch("http://localhost:44453/Client/GetAll")
        .then((res) => res.json())
        .then((data) => setClients(data));



    return (
        <div className="page-liste-devis">
        <div className="div-search-">
                <h1>Mes Factures</h1>
                <input className="form-control" placeholder="Recherhcez votre devis" />
                <button className="btn btn-success">Rechercher</button>
                <button className="btn btn-success" onClick={() => setShow(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" color="white" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                </svg> nouveau devis</button>
                <button className="btn btn-success" onClick={hrefDataUsers }> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                </svg> </button>
        </div>

            {show && <div className="div-commencer-createdevis-show">
                <h1>Commançons la création d'un nouveau devis </h1><br />
                <button className="btn btn-success" onClick={generateId}>Commencer</button><br/>
                <button className="btn btn-light" onClick={() => setShow(false)}>Annuler</button><br />
                </div>}
            {success && <Navigate to={{ pathname: `/CreerUnDevis/${generateIdDevis}` }} replace={true} />}

                    
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
                        {(deviss.length > 0 && clients.length > 0 ?
                            deviss.map(devis => (
                                <tr key={devis.id}>
                                    <td><Link to={`/Devis/${devis.id}/${devis.clientId}/${devis.entrepriseId}`}>{devis.id}</Link></td>

                                    {clients.filter(c => c.id == devis.clientId ).map(client => (
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

                            )) : <tr><td>Chargement en cours ... </td></tr> )}
                            
                           
                      
                  
                </tbody>
                    </table>

                  
        </div>
      
    );

}

export default ListeDevis;