import React, { Component, useState } from 'react';

const CreateClient = ({ idClient, changeNumEtape, setEmailClient, setDateCreationClient, setIdClient }) => {


    const [message, setMessage] = useState("");
    const [formclient, setFormClient] = useState({
        nom: "Nom", prenom: "Prenom", email: "Email",
        adresse: "Adresse", codePostale: "CodePostale", ville: "Ville",
        telephone: "Telephone", dateCreation: Date.now
    });
    const [showFormCreateClient, setSFormCreateClient] = useState(false);


    const handleClick = (event) => {
        //Send Post 

        let formData = new FormData();
        Object.keys(formclient).forEach(function (key) {
            formData.append(key, formclient[key]);
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
                    setMessage(response);
                    document.querySelectorAll("form input").forEach((e) => {
                        e.value = "";
                    })
                }
            }.bind(this);
            request.send(formData);
        }
    }

    const changeHandler = (e) => {
        setFormClient({ ...formclient, [e.target.name]: e.target.value })
    }

    return (
        <div className="d-flex justify-content-center">
   
           
            {showFormCreateClient === false &&
                <button className="btn btn-outline-primary" onClick={() => setSFormCreateClient(true)}> Créer un nouveau client </button>
            }
          

            {showFormCreateClient && 
                <form onSubmit={handleClick} style={{ width: "100%" }}>
                    <input type="text" className="form-control" name="nom" onChange={changeHandler} placeholder="Nom" />
                    <input type="text" className="form-control" name="prenom" onChange={changeHandler} placeholder="Prenom" />
                    <input type="email" className="form-control" name="email" onChange={changeHandler} placeholder="Adresse Email" />
                    <input type="text" className="form-control" name="adresse" onChange={changeHandler} placeholder="Adresse" />
                    <input className="form-control" name="codePostale" onChange={changeHandler} placeholder="CodePostale" />
                    <input type="text" className="form-control" name="ville" onChange={changeHandler} placeholder="Ville" />
                    <input className="form-control" name="telephone" onChange={changeHandler} placeholder="Telephone" />
                    <button className="btn btn-primary" type="submit">Créer </button>
                     <button className="btn btn-light" type="button" onClick={() => setSFormCreateClient(false) }>Annuler </button>
                    {message}
                </form>
                }
                
            
        </div>
    );
}



export default CreateClient;

