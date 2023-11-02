import React, { Component } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis'

export class SaisirUnClient extends Component {

    render() {
        return (
            <div>
                <PorgressBarCreationDevis/>
                <input type="text" name="Nom" placeholder="Nom" />
                <input type="text" name="Prenom" placeholder="Prenom" />
                <input type="text" name="Email" placehoder="Email" />
                <input type="text" name="Adresse" placeholder="Adresse" />
                <input name="CodePostale" placeholder="CodePostale" />
                <input type="text" name="Ville" placeholder="Ville" />
                <input name="Telephone" placeholder="Telephone" />
                <input name="DevisId" type="hidden" value="1" />

                <button type="button">Créer </button>
            </div>
        );
    }
}



export default SaisirUnClient;