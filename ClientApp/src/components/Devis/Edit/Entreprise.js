import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditEntreprise = () => {
    const entrepriseId_param = 1;
    const [entreprise, setEntreprise] = useState([]);
    const [formEntreprise, setFormEntreprise] = useState({
        nom:"", email:"",
        adresse: "", codePostale: 0, ville:"",
        telephone:0
    });

    useEffect(() => {
    fetch(`http://localhost:44453/Entreprise/GetById?id=${entrepriseId_param}`)
        .then((res) => res.json())
        .then((data) => setEntreprise(data));

    }, []); //allow to fetch once the data 

    entreprise.forEach((item) => {
        formEntreprise.nom = item.nom
        formEntreprise.email = item.email
        formEntreprise.adresse = item.adresse
        formEntreprise.codePostale = item.codePostale
        formEntreprise.ville = item.ville
        formEntreprise.telephone = item.telephone

    })
  

    const changeHandlerEntreprise = (e) => {
        setFormEntreprise({ ...formEntreprise, [e.target.name]: e.target.value })
    }

    const editEntrepriseSubmit = (event) => {
        let formData = new FormData();
        Object.keys(formEntreprise).forEach(function (key) {
            formData.append(key, formEntreprise[key]);
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

            request.open("POST", "Entreprise/Edit", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    //setMessage(response);     
                }
            }.bind(this);
            request.send(formData);
        }
    }

    return (
        <>
          
           
                <form onSubmit={editEntrepriseSubmit} >

                    <h1>Modifier les données de l'entreprise </h1>
                <input type="text" className="form-control" name="nom" onChange={changeHandlerEntreprise} defaultValue={formEntreprise.nom} />
                <input type="email" className="form-control" name="email" onChange={changeHandlerEntreprise} defaultValue={formEntreprise.email} />
                <input type="text" className="form-control" name="adresse" onChange={changeHandlerEntreprise} defaultValue={formEntreprise.adresse} />
                <input className="form-control" name="codePostale" onChange={changeHandlerEntreprise} defaultValue={formEntreprise.codePostale} />
                <input type="text" className="form-control" name="ville" onChange={changeHandlerEntreprise} defaultValue={formEntreprise.ville} />
                <input className="form-control" name="telephone" onChange={changeHandlerEntreprise} defaultValue={formEntreprise.telephone} />
                    <button className="btn btn-success" type="submit">Modifier </button>

                </form>
            
      </>
    );
}



export default EditEntreprise;