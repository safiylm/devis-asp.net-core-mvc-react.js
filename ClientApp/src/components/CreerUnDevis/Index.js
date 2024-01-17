import React, { useState } from 'react';
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
    const queryParameters = new URLSearchParams(window.location.search)
    const id_param = queryParameters.get("id")

    const [tvaTotal, setTvaTotal] = useState(0)
    const [htTotal, setHtTotal] = useState(0)


    return (
        <div className="page-formCreationDevis">
                Id = {id_param }<br/>
                Entreprise = {idEntreprise}{emailEntreprise}{dateCreationEntreprise}<br />
                Client = {idClient}{emailClient}{dateCreationClient}
                <PorgressBarCreationDevis numEtapee={numEtapee} changeNumEtape={changeNumEtape } />

                {numEtapee == 1 && < SaisirUneEntreprise setIdEntreprise={setIdEntreprise} setDateCreationEntreprise={setDateCreationEntreprise} setEmailEntreprise={setEmailEntreprise} changeNumEtape={changeNumEtape} />}
                {numEtapee == 2 && < SaisirUnClient setIdClient={setIdClient} setEmailClient={setEmailClient} setDateCreationClient={setDateCreationClient} changeNumEtape={changeNumEtape} />}
                {numEtapee == 3 && < SaisirLesProduits idDevis={id_param} changeNumEtape={changeNumEtape} />}
                {numEtapee == 4 && < SaisirLesDerniersInformations idDevis={id_param} changeNumEtape={changeNumEtape} idClient={idClient} idEntreprise={idEntreprise} tvaTotal={tvaTotal} htTotal={htTotal } /> }
        </div>
        );
    
}


export default Index;