import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class PorgressBarCreationDevis extends Component {

    render(){
    return (
        <div class="stepper-wrapper">
            <div class="stepper-item completed">
                <Link to="/Devis/CreerUnDevis/SaisirUnAuteur">
                    <div class="step-counter">1</div>
                <div class="step-name">Ajouter un auteur</div>
                </Link >
            </div>
            <div class="stepper-item completed">
                <Link to="/Devis/CreerUnDevis/SaisirUnClient">
                    <div class="step-counter">2</div>
                    <div class="step-name">Ajouter un client</div>
                </Link >
            </div>
            <div class="stepper-item active">
                <Link to="/Devis/CreerUnDevis/SaisirLesProduits">
                    <div class="step-counter">3</div>
                    <div class="step-name">Ajouter les produits</div>
                </Link >
            </div>
            <div class="stepper-item">
                <Link to="/Devis/CreerUnDevis/Apercu">
                    <div class="step-counter">4</div>
                    <div class="step-name">Aperçu</div>
                </Link >
            </div>
        </div>)

}

}

export default PorgressBarCreationDevis;