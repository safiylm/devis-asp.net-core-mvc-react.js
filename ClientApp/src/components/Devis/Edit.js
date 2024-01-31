import React, { useState, useEffect } from "react"
import "../../styles/devis.css"
import EditClient from "./Edit/Client"
import EditEntreprise from "./Edit/Entreprise"
import EditProduits from "./Edit/Produits"
import EditDernieresInformations    from "./Edit/DernieresInformations";

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
        <div className="page-formCreationDevis">

            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-dark" onClick={editClient}>Modifier le client </button>
                <button type="button" class="btn btn-outline-dark" onClick={editEntreprise}>Modifier l'entreprise  </button>
                <button type="button" class="btn btn-outline-dark" onClick={editProduits}>Modifier les produits </button>
                <button type="button" class="btn btn-outline-dark" onClick={editLastElements}>Modifier les derniers éléments  </button>
                <button type="button" class="btn btn-outline-danger" onClick={() => clickDeleteDevis(id)}>Supprimer ce devis</button>
            </div> 

            <br />

          
            {show == "Client" &&
                <div style={{ width: "550px" }}>
                    <EditClient clientId_param={clientId_param} />
                </div>
            }

            {show == "Entreprise" &&
                <div style={{ width: "550px" }}>
                    <EditEntreprise entrepriseId_param={entrepriseId_param} />
                </div>
            }

            {show == "Produits" &&
                <div style={{ width: "auto" }}>
                    <EditProduits tempid_={tempid_} />
                </div>
            }

            {show == "Last element" && <div style={{ width: "550px" }}>
            
                <EditDernieresInformations devisId={id}
                    devisTempId={tempid_}
                    clientId={clientId_param}
                    entrepriseId={entrepriseId_param}
                    userId={2}
                
                />
                        
            </div>
            }
        </div>
    );
}



export default EditDevis;