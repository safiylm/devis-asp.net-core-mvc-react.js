import React, { Component, useState } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis'
import '../../styles/formCreationDevis.css';

const SaisirUnClient  = () => {

   
    
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
        //event.preventDefault();
        //   var request;
        //   if (window.XMLHttpRequest) {
        //       //New browsers.
        //      request = new XMLHttpRequest();
        //   }
        //   else if (window.ActiveXObject) {
        //       //Old IE Browsers.
        //      request = new ActiveXObject("Microsoft.XMLHTTP");
        //   }
        //   if (request != null) {

        //       request.open("POST", "Client/Create", false);

        //     //  var params = "{Nom: 'Safinaz', Prenom: 'yilmaz', Email:'safinaz@fmike.com', Adresse :'9 rue xwxw',  CodePostale: 65000,  Ville:'Vienne',  Telephone:06455555444}"

        //       var params =  { nom: 'Safinaz' };

        //       request.onload = function () {
        //           if (request.readyState == 4 && request.status == 200) {
        //               var response = JSON.parse(request.responseText);
        //               console.log(response);
        //               alert("Hello: " + response.prenom + " .\n et le reste : " + response);
        //               setMessage("Hello: " + response.Name + " .\nCurrent Date and Time: " + response.DateTime);
        //           }
        //       }.bind(this);
        //       request.send(params);
        // }
        //alert('A name was submitted: ' + Nom + ' ' + Prenom + " " + Email + " " + Adresse + " " + CodePostale + " " + Ville + " " + Telephone);
     }

    const handleSubmit = () => {
        fetch('http://localhost:44453/Client/Create?nom=' + Nom)
            
    }
  
   
    return (
        <div className="formCreationDevis">
          
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" refs="Nom" onChange={(e)=>setNom(e.target.value)} placeholder="Nom" />
                <input type="text" className="form-control" refs="Prenom" onChange={(e) => setPrenom(e.target.value)} placeholder="Prenom" />
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