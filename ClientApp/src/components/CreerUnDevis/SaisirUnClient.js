import React, { Component } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis'
import '../../styles/formCreationDevis.css';

export class SaisirUnClient extends Component {
    constructor(props) {
        
        super(props);
    }

    render() {
        return (
            <div className="formCreationDevis">
                <PorgressBarCreationDevis numEtape={2} />
                <form>
                    <input type="text" className="form-control" name="Nom" placeholder="Nom" />
                    <input type="text" className="form-control" name="Prenom" placeholder="Prenom" />
                    <input type="email" className="form-control" name="Email" placeholder="Adresse Email" />
                    <input type="text" className="form-control" name="Adresse" placeholder="Adresse" />
                    <input name="CodePostale" className="form-control" placeholder="CodePostale" />
                    <input type="text" className="form-control" name="Ville" placeholder="Ville" />
                    <input name="Telephone" className="form-control" placeholder="Telephone" />
                    <input name="DevisId" type="hidden" value="1" />

                    <button className="btn btn-primary" type="button">Créer </button>
                </form>
            </div>
        );
    }
}



export default SaisirUnClient;