import React, { useState } from 'react';
import '../../../styles/formCreationDevis.css';
import ListeEntreprise from '../Liste/ListeEntreprise.js'

const SaisirUneEntreprise = ({ changeNumEtape, setDateCreationEntreprise, setEmailEntreprise, setIdEntreprise})=>{
  
     const [message, setMessage] = useState("");
     const [entreprise, setEntreprise] = useState({
         nom: "Nom", email: "Email",
         adresse: "Adresse", codePostale: 123, ville: "Ville",
         telephone: 456789, siteInternet:"mon-entreprise.fr", dateCreation: Date.now
     });

     const handleSubmit = (event) => {

         let formData = new FormData();
         Object.keys(entreprise).forEach(function (key) {
             formData.append(key, entreprise[key]);
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

             request.open("POST", "Entreprise/Create", false);
             request.onload = function () {
                 if (request.readyState == 4 && request.status == 200) {
                     var response = JSON.parse(request.responseText);
                     document.querySelectorAll("form input").forEach((e) => {
                         e.value = "";
                     })
                     setMessage(response);
                     setEmailEntreprise(entreprise.email)
                     setDateCreationEntreprise(entreprise.dateCreation)
                     changeNumEtape(2);

                 }
             }.bind(this);
             request.send(formData);
         }
     };

     const changeHandler = (e) => {
         setEntreprise({ ...entreprise, [e.target.name]: e.target.value })
     }
    
     return (
         <div className="div-choisir-ou-saisir" >
             <ListeEntreprise setIdEntreprise={setIdEntreprise} changeNumEtape={changeNumEtape } />
            
             <div className="div-saisir">
                 <form onSubmit={handleSubmit}>
                    <h1>Créer une nouvelle entreprise </h1>
                    <input type="text" className="form-control" name="nom" onChange={changeHandler} placeholder="Nom" />
                    <input type="email" className="form-control" name="email" onChange={changeHandler} placeholder="Adresse Email" />
                    <input type="text" className="form-control" name="adresse" onChange={changeHandler} placeholder="Adresse" />
                    <input type="number" className="form-control" name="codePostale" onChange={changeHandler} placeholder="CodePostale" />
                    <input type="text" className="form-control" name="ville" onChange={changeHandler} placeholder="Ville" />
                    <input type="number" className="form-control" name="telephone" onChange={changeHandler} placeholder="Telephone" />
                    <input type="text" className="form-control" name="siteInternet" onChange={changeHandler} placeholder="SiteInternet" />
                    <button className="btn btn-success" type="submit">Créer </button>
                </form>
                {message }
            </div>
         </div>
        );
    
}



export default SaisirUneEntreprise;