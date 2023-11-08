import React, { Component, useState } from 'react';
import '../../styles/formCreationDevis.css';

const SaisirUnClient  = () => {

   

    const [client, setClient] = useState({
        nom: "Nom", prenom: "Prenom", email: "Email",
        adresse: "Adresse", codePostale: "CodePostale", ville: "Ville",
        telephone: "Telephone", dateCreation : Date.now
    });


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
                   }
               }.bind(this);
               request.send(formData);
         }
     }

    const changeHandler = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value })
    }
   
    return (
        <div className="formCreationDevis">
          
            <form onSubmit={handleClick}>
                <input type="text" className="form-control" name="nom" onChange={changeHandler } placeholder="Nom" />
                <input type="text" className="form-control" name="prenom" onChange={changeHandler } placeholder="Prenom" />
                <input type="email" className="form-control" name="email" onChange={changeHandler } placeholder="Adresse Email" />
                <input type="text" className="form-control" name="adresse" onChange={changeHandler} placeholder="Adresse" />
                <input className="form-control" name="codePostale" onChange={changeHandler} placeholder="CodePostale" />
                <input type="text" className="form-control" name="ville" onChange={changeHandler} placeholder="Ville" />
                <input className="form-control" name="telephone"  onChange={changeHandler} placeholder="Telephone" />

                <button className="btn btn-primary" type="submit">Créer </button>
            </form>
           
        </div>
    );
    }



export default SaisirUnClient;