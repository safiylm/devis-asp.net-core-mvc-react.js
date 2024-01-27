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
    const [sommePrixTVA, setSommePrixTVA] = useState(0);
    const [sommePrixHT, setSommePrixHT] = useState(0);


    return (
        <div className="page-formCreationDevis">
            Id = {id_param}<br />
                Entreprise = {idEntreprise}{emailEntreprise}{dateCreationEntreprise}<br />
                Client = {idClient}{emailClient}{dateCreationClient}
                <PorgressBarCreationDevis numEtapee={numEtapee} changeNumEtape={changeNumEtape } />

            {numEtapee == 1 && < SaisirUneEntreprise idEntreprise={idEntreprise} setIdEntreprise={setIdEntreprise} setDateCreationEntreprise={setDateCreationEntreprise} setEmailEntreprise={setEmailEntreprise} changeNumEtape={changeNumEtape} />}
            {numEtapee == 2 && < SaisirUnClient idClient={idClient} setIdClient={setIdClient} setEmailClient={setEmailClient} setDateCreationClient={setDateCreationClient} changeNumEtape={changeNumEtape} />}
            {numEtapee == 3 && < SaisirLesProduits idDevis={id_param} changeNumEtape={changeNumEtape} setSommePrixTVA={setSommePrixTVA} setSommePrixHT={setSommePrixHT }/>}
            {numEtapee == 4 && < SaisirLesDerniersInformations idDevis={id_param} changeNumEtape={changeNumEtape} idClient={idClient} idEntreprise={idEntreprise} sommePrixTVA={sommePrixTVA} sommePrixHT={sommePrixHT }/> }
        </div>
        );
    
}


export default Index;