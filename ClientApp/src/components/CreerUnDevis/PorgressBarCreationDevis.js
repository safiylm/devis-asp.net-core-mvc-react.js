import React from 'react';
import '../../styles/PorgressBarCreationDevis.css'

function PorgressBarCreationDevis({ numEtapee, changeNumEtape }) {

   
        return (

            <div>
               
                <div class="stepper-wrapper">

                    <div className={`${numEtapee === 1 ? "stepper-item active completed" : "stepper-item"}`} >
                        <button onClick={() => changeNumEtape(1)} >
                            <div className="step-counter">1</div>
                            <div className="step-name">Ajouter un auteur</div>
                        </button >
                    </div>

                    <div 
                        className={`${numEtapee === 2 ? "stepper-item active completed" : "stepper-item"}`}>
               
                        <button onClick={() => changeNumEtape(2)} >
                            <div className="step-counter">2</div>
                            <div className="step-name">Ajouter un client</div>
                        </button >
                    </div>
                    <div className="stepper-item"   
                        className={`${numEtapee === 3 ? "stepper-item active completed" : "stepper-item"}`}  >
               
                        <button onClick={() => changeNumEtape(3)}>
                            <div className="step-counter">3</div>
                            <div className="step-name">Ajouter les produits</div>
                        </button >
                    </div>
                    <div className={`${numEtapee === 4 ? "stepper-item active completed" : "stepper-item"}`}>
                        <button onClick={() => changeNumEtape(4)}>
                            <div className="step-counter">4</div>
                            <div className="step-name">Aperçu</div>
                        </button >
                    </div>

                </div>
               
            </div>)


}
export default PorgressBarCreationDevis;