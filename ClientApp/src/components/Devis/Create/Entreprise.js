import React, { useState } from 'react';

const CreateEntreprise = ({ idEntreprise,  changeNumEtape, setDateCreationEntreprise, setEmailEntreprise, setIdEntreprise})=>{
  
     const [message, setMessage] = useState("");
     const [entreprise, setEntreprise] = useState({
         nom: "Nom", email: "Email",
         adresse: "Adresse", codePostale: 123, ville: "Ville",
         telephone: 456789, siteInternet:"mon-entreprise.fr", dateCreation: Date.now
     });
    const [showFormCreateEntreprise, setSFormCreateEntreprise] = useState(false);
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
                   

                 }
             }.bind(this);
             request.send(formData);
         }
     };

     const changeHandler = (e) => {
         setEntreprise({ ...entreprise, [e.target.name]: e.target.value })
     }
    
     return (
         <div className="d-flex justify-content-center">
             
             {showFormCreateEntreprise === false &&
                 <button className="btn btn-outline-primary" onClick={() => setSFormCreateEntreprise(true)}> Créer une nouvelle entreprise</button>
             }
            
             {showFormCreateEntreprise &&
                 <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <input type="text" className="form-control" name="nom" onChange={changeHandler} placeholder="Nom" />
                    <input type="email" className="form-control" name="email" onChange={changeHandler} placeholder="Adresse Email" />
                    <input type="text" className="form-control" name="adresse" onChange={changeHandler} placeholder="Adresse" />
                    <input type="number" className="form-control" name="codePostale" onChange={changeHandler} placeholder="CodePostale" />
                    <input type="text" className="form-control" name="ville" onChange={changeHandler} placeholder="Ville" />
                    <input type="number" className="form-control" name="telephone" onChange={changeHandler} placeholder="Telephone" />
                    <input type="text" className="form-control" name="siteInternet" onChange={changeHandler} placeholder="SiteInternet" />
                    <button className="btn btn-primary" type="submit">Créer </button>
                     <button className="btn btn-light" type="button" onClick={() => setSFormCreateEntreprise(false) }>Annuler </button>
                     {message}
                 </form>
               
           }
         </div>
        );
    
}



export default CreateEntreprise;