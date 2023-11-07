import React, { useState } from 'react';
import '../../styles/MenuVerticale.css';
import { Link } from 'react-router-dom';

const MenuVerticale = () => {


    return (
        <div className="div-barre-verticale">
            <Link to="/CreerUnDevis/SaisirUnAuteur"> Creer un devis </Link>
            <Link to="/ListeDevis"> Liste de devis </Link>
            <Link to="/MonCompte/MesDonneesPersonnelles"> Mes donnees personelles </Link>

        </div>
    );


}
export default MenuVerticale;