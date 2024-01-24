import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditClient = () => {
    const clientId_param = 4005;
    const [clients, setClients] = useState([]);
    const [formclient, setFormClient] = useState({
        id: clientId_param, nom: "", prenom: "", email: "",
        adresse: "", codePostale: 0, ville: "",
        telephone: 0
    });

    useEffect( () => {
        fetch(`http://localhost:44453/Client/GetById?id=${clientId_param}`)
            .then((res) => res.json())
            .then((data) => setClients(data))


      

    }, []); 

     clients.forEach((item) => {
        formclient.nom = item.nom
        formclient.prenom = item.prenom
        formclient.email = item.email
        formclient.adresse = item.adresse
        formclient.codePostale = item.codePostale
        formclient.ville = item.ville
        formclient.telephone = item.telephone

    })


    const changeHandlerClient = (e) => {
        setFormClient({ ...formclient, [e.target.name]: e.target.value })
    }


    const editClientSubmit = (event) => {
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

            request.open("POST", "Client/Edit", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                   // setMessage(response);
                   
                }
            }.bind(this);
            request.send(formData);
        }
    }

    return (
        <>
                <form  onSubmit={editClientSubmit} >

                    <h1>Modifier les données du client </h1>
                    
                <input type="text" className="form-control" name="nom" onChange={changeHandlerClient} defaultValue={formclient.nom} />
                <input type="text" className="form-control" name="prenom" onChange={changeHandlerClient} defaultValue={formclient.prenom} />
                <input type="email" className="form-control" name="email" onChange={changeHandlerClient} defaultValue={formclient.email} />
                <input type="text" className="form-control" name="adresse" onChange={changeHandlerClient} defaultValue={formclient.adresse} />
                <input type="number" className="form-control" name="codePostale" onChange={changeHandlerClient} defaultValue={formclient.codePostale} />
                <input type="text" className="form-control" name="ville" onChange={changeHandlerClient} defaultValue={formclient.ville} />
                <input className="form-control" name="telephone" onChange={changeHandlerClient} defaultValue={formclient.telephone} />
                        <button className="btn btn-success" type="submit">Modifier </button>
                
                       
            </form>
     </>
    );
}



export default EditClient;