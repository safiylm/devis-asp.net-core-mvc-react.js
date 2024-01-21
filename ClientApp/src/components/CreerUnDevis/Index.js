import React, { useState, useEffect } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis';
import SaisirUnClient from './Form/SaisirUnClient';
import SaisirUneEntreprise from './Form/SaisirUneEntreprise';
import SaisirLesProduits from './Form/SaisirLesProduits';
import SaisirLesDerniersInformations from './Form/SaisirLesDerniersInformations';


function Index() {
    const [idEntreprise, setIdEntreprise] = useState(0)
    const [emailEntreprise, setEmailEntreprise] = useState()
    const [dateCreationEntreprise, setDateCreationEntreprise] = useState()

    const [idClient, setIdClient] = useState(0)
    const [emailClient, setEmailClient] = useState()
    const [dateCreationClient, setDateCreationClient] = useState()

    const [numEtapee, changeNumEtape] = useState(1)
 
    const url_ = window.location.pathname;
    const arrayURL = url_.split("/");
    const id_param = arrayURL[2];

    return (
        <div className="page-formCreationDevis">
            Id = {id_param}<br />
                Entreprise = {idEntreprise}{emailEntreprise}{dateCreationEntreprise}<br />
                Client = {idClient}{emailClient}{dateCreationClient}
                <PorgressBarCreationDevis numEtapee={numEtapee} changeNumEtape={changeNumEtape } />

                {numEtapee == 1 && < SaisirUneEntreprise setIdEntreprise={setIdEntreprise} setDateCreationEntreprise={setDateCreationEntreprise} setEmailEntreprise={setEmailEntreprise} changeNumEtape={changeNumEtape} />}
                {numEtapee == 2 && < SaisirUnClient setIdClient={setIdClient} setEmailClient={setEmailClient} setDateCreationClient={setDateCreationClient} changeNumEtape={changeNumEtape} />}
                {numEtapee == 3 && < SaisirLesProduits idDevis={id_param} changeNumEtape={changeNumEtape} />}
                {numEtapee == 4 && < SaisirLesDerniersInformations idDevis={id_param} changeNumEtape={changeNumEtape} idClient={idClient} idEntreprise={idEntreprise} /> }
        </div>
        );
    
}


export default Index;