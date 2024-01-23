import React, { useState, useEffect } from "react"
import "../../styles/devis.css"
import EditClient from "./Edit/Client"
import EditEntreprise from "./Edit/Entreprise"
import EditProduits from "./Edit/Produits"

const EditDevis = () => {
    const [show, setShow] =useState("R")
    const editClient = () => { setShow("Client") }
    const editEntreprise = () => { setShow("Entreprise") }
    const editProduits = () => { setShow("Produits") }
    const editLastElements = () => { setShow("Last element")  }
    const deleteDevis = () => { setShow("Supprimer") }


    return (
        <>
            <button className="btn btn-light" onClick={editClient }>Modifier le client </button>
            <button className="btn btn-light" onClick={editEntreprise }>Modifier l'entreprise  </button>
            <button className="btn btn-light" onClick={editProduits }> Modifier les produits  </button>
            <button className="btn btn-light" onClick={editLastElements }> Modifier les derniers éléments  </button>
            <button className="btn btn-danger" onClick={deleteDevis}> Supprimer ce devis  </button>
            <br/>
            {show == "Client" && <EditClient />}
            {show == "Entreprise" && <EditEntreprise/> }
            {show == "Produits" && <EditProduits /> }
        </>
    );
}



export default EditDevis;