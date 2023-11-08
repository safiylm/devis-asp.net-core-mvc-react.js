import React, { Component, useState } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis'
import '../../styles/formCreationDevis.css';

const SaisirUnClient  = () => {

   
    const [client, setClient] = useState({ id : 9, 
        nom: "hadi", prenom: "zhadiii", email: "safinaz@gmail.com",
        adresse: "8 rue Jean Pascal", codePostale: 54300, ville: "Nancy", telephone: 444 , dateCreation
            : Date.now, devisId : 1 });
  
    const [Nom, setNom] = useState("Yilmaz");
    const [Prenom, setPrenom] = useState("Safinaz");
    const [Email, setEmail] = useState("safinaz@gmail.com");
    const [Adresse, setAdresse] = useState("9 rue casablanca");
    const [CodePostale, setCodePostale] = useState("89000");
    const [Ville, setVille] = useState("Lyon");
    const [Telephone, setTelephone] = useState("06 06 06 06 05");
    const [Message, setMessage] = useState("06 06 06 06 05");


    const handleClick = (event) => {
        //Send Post 

        let formData = new FormData();
        Object.keys(client).forEach(function (key) {
            formData.append(key, client[key]);
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

               request.open("POST", "Client/Create", false);

         
                      request.onload = function () {
                   if (request.readyState == 4 && request.status == 200) {
                      var response = JSON.parse(request.responseText);
                       console.log(response);
                      alert("Hello: " + response.prenom + " .\n et le reste : " + response);
                       setMessage("Hello: " + response.Name + " .\nCurrent Date and Time: " + response.DateTime);
                   }
               }.bind(this);
              // request.send(JSON.stringify(client));
               request.send(formData);
         }
        alert('A name was submitted: ' + Nom + ' ' + Prenom + " " + Email + " " + Adresse + " " + CodePostale + " " + Ville + " " + Telephone);
     }

  
   
    return (
        <div className="formCreationDevis">
          
            <form onSubmit={handleClick}>
                <input type="text" className="form-control" name="nom" onChange={(e)=>setNom(e.target.value)} placeholder="Nom" />
                <input type="text" className="form-control" name="prenom" onChange={(e) => setPrenom(e.target.value)} placeholder="Prenom" />
                <input type="email" className="form-control" refs="Email" onChange={(e) => setEmail(e.target.value)} placeholder="Adresse Email" />
                <input type="text" className="form-control" refs="Adresse" onChange={(e) => setAdresse(e.target.value)} placeholder="Adresse" />
                <input refs="CodePostale" className="form-control" onChange={(e) => setCodePostale(e.target.value)} placeholder="CodePostale" />
                <input type="text" className="form-control" refs="Ville" onChange={(e) => setVille(e.target.value)} placeholder="Ville" />
                <input refs="Telephone" className="form-control" onChange={(e) => setTelephone(e.target.value)} placeholder="Telephone" />
                <input refs="DevisId" type="hidden" value="1" />
                <button className="btn btn-primary" type="submit">Créer </button>
            </form>
            {Message}
        </div>
    );
    }



export default SaisirUnClient;