import React, { Component } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis';

export class SaisirUnAuteur extends Component {

    render() {
        return (
            <div>
                <PorgressBarCreationDevis/>
                <input type="text" name="Nom" placeholder="Nom" />
                <input type="text" name="Email" placehoder="Email" />
                <input type="text" name="Adresse" placeholder="Adresse" />
                <input name="CodePostale" placeholder="CodePostale" />
                <input type="text" name="Ville" placeholder="Ville" />
                <input name="Telephone" placeholder="Telephone" />
                <input type="text" name="SiteInternet" placeholder="SiteInternet" />
                <input name="UserId" type="hidden" value="1" />

                <button type="button">Créer </button>
            </div>
        );
    }
}



export default SaisirUnAuteur;