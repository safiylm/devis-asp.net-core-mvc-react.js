import React, { useState, useEffect } from "react"
import "../../styles/devis.css"
import EditClient from "./Edit/Client"
import EditEntreprise from "./Edit/Entreprise"
import EditProduits from "./Edit/Produits"
import EditDevisLeReste from "./Edit/LeReste";

const EditDevis = () => {
    const [show, setShow] =useState("Client")
    const editClient = () => { setShow("Client") }
    const editEntreprise = () => { setShow("Entreprise") }
    const editProduits = () => { setShow("Produits") }
    const editLastElements = () => { setShow("Last element")  }


    const url_ = window.location.pathname;
    const arrayURL = url_.split("/");
    const id = arrayURL[3];
    const tempid_ = arrayURL[4];
    const clientId_param = arrayURL[5];
    const entrepriseId_param = arrayURL[6];
    const userId = 21;
  
    const [totalTVA, setTotalTVA] = useState(0)
    const [totalHT, setTotalHT] = useState(0)

    const clickDeleteDevis = (devisId) => {
        let text = "Vous êtes sure de vouloir supprimer votre devis";
        let x = window.confirm(text)
        if (x == true) {
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

                request.open("POST", `Devis/Delete?id=${devisId}`, false);
                request.onload = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        var response = JSON.parse(request.responseText);
                        if (response == "True") document.location.href = "/ListeDevis";
                    }
                }.bind(this);
                request.send();

              
            }
        }
    }



    return (
        <>
            <button className="btn btn-light" onClick={editClient }>Modifier le client </button>
            <button className="btn btn-light" onClick={editEntreprise }>Modifier l'entreprise  </button>
            <button className="btn btn-light" onClick={editProduits }> Modifier les produits  </button>
            <button className="btn btn-light" onClick={editLastElements }> Modifier les derniers éléments  </button>
            <button className="btn btn-danger" onClick={ () => clickDeleteDevis(id)}> Supprimer ce devis  </button>
            <br/>
            {show == "Client" && <EditClient clientId_param={clientId_param } />}
            {show == "Entreprise" && <EditEntreprise entrepriseId_param={entrepriseId_param }/> }
            {show == "Produits" && <EditProduits tempid_={tempid_} setTotalTVA={setTotalTVA} setTotalHT={setTotalHT }/>}
            {show == "Last element" && <EditDevisLeReste devisId={id} devisTempId={tempid_} clientId={clientId_param} entrepriseId={entrepriseId_param} userId={2} totalTVA={totalTVA} totalHT={totalHT } />}
        </>
    );
}



export default EditDevis;