import React, { useState } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis';
import SaisirUnClient from './Form/SaisirUnClient';
import SaisirUneEntreprise from './Form/SaisirUneEntreprise';
import SaisirLesProduits from './Form/SaisirLesProduits';
import SaisirLesDerniersInformations from './Form/SaisirLesDerniersInformations';
import MenuVerticale from '../MenuVerticale/MenuVerticale.js'

function Index() {

    const [idEntreprise, setIdEntreprise] = useState(0)
    const [emailEntreprise, setEmailEntreprise] = useState()
    const [dateCreationEntreprise, setDateCreationEntreprise] = useState()

    const [idClient, setIdClient] = useState(0)
    const [emailClient, setEmailClient] = useState()
    const [dateCreationClient, setDateCreationClient] = useState()

    const [numEtapee, changeNumEtape] = useState(1)
    const queryParameters = new URLSearchParams(window.location.search)
    const id_param = queryParameters.get("id")


    return (
        <div className="page-formCreationDevis">
            <MenuVerticale />
            <div className="formCreationDevis">
                Entreprise{idEntreprise}{emailEntreprise}{dateCreationEntreprise}<br />
                Client {idClient}{emailClient}{dateCreationClient}
                <PorgressBarCreationDevis numEtapee={numEtapee} changeNumEtape={changeNumEtape } />

                {numEtapee == 1 && < SaisirUneEntreprise setIdEntreprise={setIdEntreprise} setDateCreationEntreprise={setDateCreationEntreprise} setEmailEntreprise={setEmailEntreprise} changeNumEtape={changeNumEtape} />}
                {numEtapee == 2 && < SaisirUnClient setIdClient={setIdClient} setEmailClient={setEmailClient} setDateCreationClient={setDateCreationClient} changeNumEtape={changeNumEtape} />}
                {numEtapee == 3 && < SaisirLesProduits idDevis={id_param} changeNumEtape={changeNumEtape} />}
                {numEtapee == 4 && < SaisirLesDerniersInformations idDevis={id_param} changeNumEtape={changeNumEtape} /> }
            </div>
        </div>
        );
    
}


export default Index;