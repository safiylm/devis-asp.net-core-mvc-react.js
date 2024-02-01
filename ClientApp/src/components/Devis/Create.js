import React, { useState, useEffect } from 'react';
import CreateClient from './Create/Client';
import CreateEntreprise from './Create/Entreprise';
import EditProduits from './Create/Produits';
import CreateDernieresInformations from './Create/DernieresInformations';
import ListeEntreprise from './Select/Entreprise.js';
import ListeClient from './Select/Client.js';


function CreateDevis() {
    const [idEntreprise, setIdEntreprise] = useState(0)
    const [emailEntreprise, setEmailEntreprise] = useState()
    const [dateCreationEntreprise, setDateCreationEntreprise] = useState()

    const [idClient, setIdClient] = useState(0)
    const [emailClient, setEmailClient] = useState()
    const [dateCreationClient, setDateCreationClient] = useState()

    const [numEtapee, changeNumEtape] = useState(1)
 
    const url_ = window.location.pathname;
    const arrayURL = url_.split("/");
    const id_param = arrayURL[3];
    const [totalTVA, setTotalTVA] = useState(0);
    const [totalHT, setTotalHT] = useState(0);


    return (
        <div className="page-formCreationDevis">

            <div class="btn-group" role="group" aria-label="Basic outlined example">

                <button type="button"
                    className={`${numEtapee === 1 ? "btn btn-dark" : "btn btn-outline-dark"}`}
                    onClick={() => changeNumEtape(1)} > Ajouter une entreprise
                </button >

                {idEntreprise === 0 ?
                <button type="button" 
                        className={`${numEtapee === 2 ? "btn btn-dark" : "btn btn-outline-dark"}`}
                        onClick={() => changeNumEtape(2)} disabled >
                    Ajouter un client
                </button >
                    :
                    <button type="button"
                        className={`${numEtapee === 2 ? "btn btn-dark" : "btn btn-outline-dark"}`}
                        onClick={() => changeNumEtape(2)} >
                        Ajouter un client
                    </button >
                     }
                {idClient === 0 ?
                    <button type="button"
                        className={`${numEtapee === 3 ? "btn btn-dark" : "btn btn-outline-dark"}`}
                        onClick={() => changeNumEtape(3)} disabled>
                        Ajouter les produits
                    </button >
                    :
                    <button type="button"
                        className={`${numEtapee === 3 ? "btn btn-dark" : "btn btn-outline-dark"}`}
                        onClick={() => changeNumEtape(3)}>
                        Ajouter les produits
                    </button >
                }

                {totalHT === 0 ?
                    <button type="button"
                        className={`${numEtapee === 4 ? "btn btn-dark" : "btn btn-outline-dark"}`}
                        onClick={() => changeNumEtape(4)} disabled>
                        Aperçu
                    </button >
                    :
                    <button type="button"
                        className={`${numEtapee === 4 ? "btn btn-dark" : "btn btn-outline-dark"}`}
                        onClick={() => changeNumEtape(4)}>
                        Aperçu
                    </button >
                 }

            </div>
           <p></p>
            <p></p>
            
            {numEtapee == 1 && <div style={{ width: "750px" }}>
                <ListeEntreprise idEntreprise={idEntreprise}
                    setIdEntreprise={setIdEntreprise}
                    changeNumEtape={changeNumEtape} />
                <CreateEntreprise idEntreprise={idEntreprise}
                    setIdEntreprise={setIdEntreprise}
                    setDateCreationEntreprise={setDateCreationEntreprise}
                    setEmailEntreprise={setEmailEntreprise}
                    changeNumEtape={changeNumEtape} />
                
                </div>
            }
            {numEtapee == 2 && <div style={{ width: "750px" }}>
                
                <ListeClient idClient={idClient} 
                    setIdClient={setIdClient} 
                    changeNumEtape={changeNumEtape }                  
                />
                <CreateClient idClient={idClient}
                    setIdClient={setIdClient}
                    setEmailClient={setEmailClient}
                    setDateCreationClient={setDateCreationClient}
                    changeNumEtape={changeNumEtape} />
            </div>

            }
            {numEtapee == 3 && < EditProduits tempid_={id_param}
                changeNumEtape={changeNumEtape}
                setTotalTVA={setTotalTVA}
                setTotalHT={setTotalHT}
                totalTVA={totalTVA}
                totalHT={totalHT} />}

            {numEtapee == 4 && < CreateDernieresInformations
                idDevis={id_param}
                changeNumEtape={changeNumEtape}
                idClient={idClient}
                idEntreprise={idEntreprise}
                totalTVA={totalTVA}
                totalHT={totalHT} />}


            <ul className="list-group" style={{ margin: "50px" }}>
                <li className="list-group-item"> Id = {id_param}</li>
                <li className="list-group-item"> Entreprise = {idEntreprise}{emailEntreprise}{dateCreationEntreprise}</li>
                <li className="list-group-item"> Client = {idClient}{emailClient}{dateCreationClient}</li>
              
            </ul>
           
        </div>
        );
    
}


export default CreateDevis;