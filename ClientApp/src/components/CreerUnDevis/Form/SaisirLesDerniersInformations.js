import React, { useState } from 'react';
import '../../../styles/formCreationDevis.css';
import { Navigate } from "react-router-dom";

const SaisirLesDerniersInformations = ({ idDevis, idClient, idEntreprise, htTotal , tvaTotal}) => { 

    const [success, setSuccess] = useState(false);

    const [deviss, setDevis] = useState({
        tempId: 88, //idDevis,
        motif: "Facture-Motif",
        clientId: idClient,
        entrepriseId:idEntreprise,
        userId: 21,
        tVATotal: tvaTotal,
        totalHT: htTotal,
        accompteQuantite: 10,
        accomptePourcentage: 2,
        accompteInformations: "accompteInformations",
        informationSuplementaire: "information Suplementaire",
        dateCreation: Date.now
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        Object.keys(deviss).forEach(function (key) {
            formData.append(key, deviss[key]);
        });

        var request;
        if (window.XMLHttpRequest) {
            //New browsers.
            request = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            //Old IE Browsers.
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }


        if (request != null) {

            request.open("POST", "Devis/Create", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    console.log(response);
                    setSuccess(true)
                }
            }.bind(this);
            request.send(formData);
        }


    }

    const changeHandler = (e) => {
        setDevis({ ...deviss, [e.target.name]: e.target.value })
    }

        return (
            <div className="div-saisir">
                <form onSubmit={handleSubmit}>
                
                    <label>Motif du devis :
                        <input type="text" name="motif" className="form-control"  onChange={changeHandler} style={{ width: "420px" }} />
                    </label><br/>
                    <label>Accompte pourcentage :
                        <input name="accomptePourcentage" className="form-control" onChange={changeHandler}  />
                    </label><br />
                    <label>Accompte quantitée :
                        <input name="accompteQuantite" className="form-control" onChange={changeHandler}  />
                    </label><br />
                    <label>Accompte informations :
                        <input name="accompteInformations" className="form-control" onChange={changeHandler}  />
                    </label><br />
                    <label>Informations suplémentaires :
                        <input name="informationSuplementaire" className="form-control" onChange={changeHandler}  />
                    </label><br />
                    <p>Mode de paiement </p>
                    <button type="submit" className="btn btn-success">Enregistrer et terminer</button>
                </form>
                {success && <Navigate to="/CreerUnDevis" replace={true} />}

            </div>
        );
    

}

export default SaisirLesDerniersInformations;