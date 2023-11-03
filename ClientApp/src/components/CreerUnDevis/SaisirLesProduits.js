import React, {  Component } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis';
import FormAjouterUnProduit from './FormAjouterUnProduit'; 
import '../../styles/formCreationDevis.css';

class SaisirLesProduits extends Component {

    constructor(props) {
        super(props);

        this.state = { currentCount: 1, tab: [0] };
        this.incrementCounter = this.incrementCounter.bind(this);
        this.incrementTab = this.incrementTab.bind(this);
       
    }

    incrementTab() {
        this.setState({
            tab: this.state.tab.concat(this.state.currentCount)
        })
        console.log(this.state.tab)
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
        this.incrementTab();

    }
   

    render() {
        return (
            <div className="formCreationDevis">


                <PorgressBarCreationDevis numEtape={3} />

                <p>Liste des produits</p>
                {this.state.currentCount}


                {this.state.tab.map((index) => (
                    <FormAjouterUnProduit />
                ))}

                <br/>
                <button className="btn btn-primary" onClick={this.incrementCounter}>Ajouter un produit </button>

                <p>Montant Total : </p>
                <p>Accompte de 20% à payer avant la date</p>
                <p>Mode de paiement </p>

            </div>
        );
    }

}

export default SaisirLesProduits;