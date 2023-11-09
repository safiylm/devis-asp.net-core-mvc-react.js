import React, { useState } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis';
import SaisirUnClient from './Form/SaisirUnClient';
import SaisirUneEntreprise from './Form/SaisirUneEntreprise';
import SaisirLesProduits from './Form/SaisirLesProduits';
import Apercu from './Apercu';
import MenuVerticale from '../MenuVerticale/MenuVerticale.js'

function Index() {
    const [numEtapee, changeNumEtape ] =useState(1)
  
    return (
        <div className="page-formCreationDevis">
            <MenuVerticale />
            <div className="formCreationDevis">
                <PorgressBarCreationDevis numEtapee={numEtapee} changeNumEtape={changeNumEtape} />
                {numEtapee == 1 && < SaisirUneEntreprise  /> }
                {numEtapee == 2 && < SaisirUnClient /> }
                {numEtapee == 3 && < SaisirLesProduits /> }
                {numEtapee == 4 && < Apercu /> }
            </div>
        </div>
        );
    
}





export default Index;