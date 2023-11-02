import React, {  Component } from 'react';


class FormAjouterUnProduit extends Component {

    render() {
        return (
            <div>
                 <input name="quantite" placeholder="Quantité" />
                 <input name="designation" placehoder="Désignation" />
                 <input name="PrixUnitaireHT" placeholder="Prix Unitaire HT" />
                 <input name="TVA" placeholder="TVA" />
                 <button type="button">Annuler </button>
            </div>
        );
    }

}

export default FormAjouterUnProduit;