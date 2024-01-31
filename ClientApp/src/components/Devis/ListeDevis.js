import React, { useState, useEffect } from 'react';
import '../../styles/listedevis.css';
import { Navigate, Link } from "react-router-dom";



const ListeDevis = () => {
    const [deviss, setDevis] = useState([]);
    const [clients, setClients] = useState([]);
    const [show, setShow] = useState(false);
    const [generateIdDevis, setgenerateIdDevis] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => { document.title = "Mes devis"; });

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
        const currentDate = year + "" + month + "" + date + "" + h + "" + m + "" + s + "" + ms;

        setgenerateIdDevis(currentDate)
        setSuccess(true)
    }

    useEffect(() => {
        fetch('http://localhost:44453/Devis/GetAll')
            .then((res) => res.json()  )
            .then((data) => setDevis(data));

        fetch("http://localhost:44453/Client/GetAll")
            .then((res) => res.json())
            .then((data) => setClients(data));
    }, []); 


    return (
        <div className="page-liste-devis">
            <div class="container text-center">
                <div class="row align-items-center">
                <div class="col">
                    <h1 className="text-3xl font-bold underline">Mes Factures</h1>

                </div>
                <div class="col">
                    <input className="form-control" placeholder="Recherhcez votre devis" style={{ width: "40vw" }} />
                </div>
                <div class="col">
                    <button className="btn btn-light">Rechercher</button>
                </div>
                <div class="col">
                    <button className="btn btn-light" onClick={() => setShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" color="black" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                        </svg> Nouveau devis
                    </button>
                </div>

                <div class="col">
                    <button className="btn btn-light" onClick={hrefDataUsers }> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>

            {show && <div className="div-commencer-createdevis-show">
                <h1>Commençons la création d'un nouveau devis </h1><br />
                <button className="btn btn-light" onClick={generateId} >Commencer</button> &nbsp;
                <button className="btn btn-light" onClick={() => setShow(false)} >Annuler</button><br />
                </div>}
            {success && <Navigate to={{ pathname: `/Devis/Create/${generateIdDevis}` }} replace={true} />}

                    
            <table class="table" >
                <thead>
                    <tr>
                        <th scope="col">N° de devis </th>
                        <th scope="col">Client</th>
                        <th scope="col">Montant HT</th>
                        <th scope="col">Montant TTC</th>
                        <th scope="col">Date du devis</th>
                      
                        <th scope="col">Modifier</th>

                    </tr>
                </thead>
                <tbody>
                        {(deviss.length > 0 && clients.length > 0 ?
                            deviss.map(devis => (
                                <tr key={devis.id}>
                                    <td><Link to={`/Devis/${devis.id}/${devis.tempId}/${devis.clientId}/${devis.entrepriseId}`}
                                        className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                        {devis.id}
                                    </Link></td>

                                    {clients.filter(c => c.id === devis.clientId ).map(client => (
                                        <td key={client.id}> {client.prenom} {client.nom} </td>
                                    ))}

                                    <td>
                                        {devis.totalHT }$
                                    </td>

                                    <td>
                                        {devis.totalHT + devis.totalTVA }$                                  </td>
                                    <td>
                                         {devis.dateCreation }
                                    </td>
                                 
                                    <td><Link to={`/Devis/Edit/${devis.id}/${devis.tempId}/${devis.clientId}/${devis.entrepriseId}`}
                                        className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                     Modifier</Link>
                                </td>
                                </tr>

                            )) : <tr><td>Chargement en cours ... </td></tr> )}        
                  
                </tbody>
                    </table>

                  
        </div>
      
    );

}

export default ListeDevis;