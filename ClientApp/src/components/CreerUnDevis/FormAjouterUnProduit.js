import React, {  Component } from 'react';


class FormAjouterUnProduit extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className="div-ajouter-un-produit">
                <input name="quantite" className="form-control" placeholder="Quantité" />
                <input name="designation" className="form-control" placeholder="Désignation" />
                <input name="PrixUnitaireHT" className="form-control" placeholder="Prix Unitaire HT" />
                <input name="TVA" className="form-control" placeholder="TVA" />
                <button type="button" className="btn btn-primary">Annuler </button>
            </div>
        );
    }

}

export default FormAjouterUnProduit;