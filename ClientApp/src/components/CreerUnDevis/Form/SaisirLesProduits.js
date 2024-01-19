import React, { Component, useState } from 'react';
import '../../../styles/formCreationDevis.css';

function SaisirLesProduits() {

    const [message, setMessage] = useState("");
    const [produits, setProduit] = useState([]);
    const [formAddProduct, setFormAddProduct] = useState({
        devisId: "2029", quantite: "0", designation: "-",
        prixUnitaireHT: "0", tva: "20"
    });

    fetch(`http://localhost:44453/Produit/GetAll`)
        .then((res) => res.json())
        .then((data) => setProduit(data));

    const changeHandler = (e) => {
        setFormAddProduct({ ...formAddProduct, [e.target.name]: e.target.value })
    }

    
    const sommePrixTVA = produits.map(item => item.tva).reduce((prev, curr) => prev + curr, 0);
    const sommePrixHT = produits.map(item => item.prixUnitaireHT).reduce((prev, curr) => prev + curr, 0);
    const sommeTotale = sommePrixTVA + sommePrixHT;

    const submitCreationProduit = (event) => {
        //Send Post 

        let formData = new FormData();
        Object.keys(formAddProduct).forEach(function (key) {
            formData.append(key, formAddProduct[key]);
        });

        event.preventDefault();
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

            request.open("POST", "Produit/Create", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    document.querySelectorAll("form input").forEach((e) => {
                        e.value = "";
                    })
                   
                   
                }
            }.bind(this);
            request.send(formData);
        }
    }

    return (
        <div className="div-saisir" style={{ width: "60vw" }}>
            <h1>Liste des produits</h1>
            <table>
                <thead>
                    <tr>
                        <th>Quantite</th>
                        <th>Designation</th>
                        <th>Prix Unitaire HT</th>
                        <th>Prix TVA</th>


                    </tr>
                </thead>
                <tbody>
                    {(produits.length > 0) ?
                        produits.map((item) => (
                            <tr key={item.id}>
                                <td>{item.quantite}</td>
                                <td>{item.designation}</td>
                                <td>{item.prixUnitaireHT} $ </td>
                                <td>{item.tva} $ </td>

                            </tr>
                        )) :
                        <tr><td>Loading ...</td></tr>
                    }
                </tbody>
            </table>


            <form onSubmit={submitCreationProduit} className="div-ajouter-un-produit">         
                    
                <input name="quantite" onChange={changeHandler} className="form-control" placeholder="Quantité" />          
                <input name="designation" onChange={changeHandler} className="form-control" placeholder="Désignation" />
               <input name="prixUnitaireHT" onChange={changeHandler} className="form-control" placeholder="Prix Unitaire HT" />
               <input name="tva" onChange={changeHandler} className="form-control" placeholder="TVA" />
               <button type="submit" className="btn btn-success"> Save </button>
                           
            </form>
            {message }
            
            <br />

            <h1>Montant Total: {sommeTotale } $</h1>
            <h4>Somme TVA: {sommePrixTVA} $</h4>
            <h4>Somme Hors Taxe: {sommePrixHT} $ </h4>

            </div>
    );
}


export default SaisirLesProduits;