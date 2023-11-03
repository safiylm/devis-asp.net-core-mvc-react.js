import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PorgressBarCreationDevis.css'

export class PorgressBarCreationDevis extends Component {

    constructor(props) {
        super(props);
        
        this.state = { numEtapee: props.numEtape };
        console.log(this.state.numEtapee);

    }
    render(){
    return (
        <div class="stepper-wrapper">

            <div className={`${this.state.numEtapee === 1 ? "stepper-item active completed" : "stepper-item"}`} >
                <Link to="/CreerUnDevis/SaisirUnAuteur">
                    <div className="step-counter">1</div>
                    <div className="step-name">Ajouter un auteur</div>
                </Link >
            </div>

            <div 
                className={`${this.state.numEtapee === 2 ? "stepper-item active completed" : "stepper-item"}`}>
               
                <Link to="/CreerUnDevis/SaisirUnClient">
                    <div className="step-counter">2</div>
                    <div className="step-name">Ajouter un client</div>
                </Link >
            </div>
            <div className="stepper-item"   
                className={`${this.state.numEtapee === 3 ? "stepper-item active completed" : "stepper-item"}`}  >
               
                <Link to="/CreerUnDevis/SaisirLesProduits">
                    <div className="step-counter">3</div>
                    <div className="step-name">Ajouter les produits</div>
                </Link >
            </div>
            <div className={`${this.state.numEtapee === 4 ? "stepper-item active completed" : "stepper-item"}`}>
                <Link to="/CreerUnDevis/Apercu">
                    <div className="step-counter">4</div>
                    <div className="step-name">Aperçu</div>
                </Link >
            </div>
        </div>)

}

}

export default PorgressBarCreationDevis;