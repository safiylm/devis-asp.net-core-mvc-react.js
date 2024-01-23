import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditEntreprise = () => {
    const entrepriseId_param = 1;
    const [entreprise, setEntreprise] = useState([]);

    useEffect(() => {
    fetch(`http://localhost:44453/Entreprise/GetById?id=${entrepriseId_param}`)
        .then((res) => res.json())
        .then((data) => setEntreprise(data));

    }, []); //allow to fetch once the data 


    const [formEntreprise, setFormEntreprise] = useState({
        nom: entreprise.nom, prenom: entreprise.prenom, email: entreprise.email,
        adresse: entreprise.adresse, codePostale: entreprise.codePostale, ville: entreprise.ville,
        telephone: entreprise.telephone
    });


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
            {entreprise.map((item) => (
           
                <form key={item.id} onSubmit={editEntrepriseSubmit} >

                    <h1>Modifier les données de l'entreprise </h1>
                    <input type="text" className="form-control" name="nom" onChange={changeHandlerEntreprise} defaultValue={item.nom} />
                    <input type="email" className="form-control" name="email" onChange={changeHandlerEntreprise} defaultValue={item.email} />
                    <input type="text" className="form-control" name="adresse" onChange={changeHandlerEntreprise} defaultValue={item.adresse} />
                    <input className="form-control" name="codePostale" onChange={changeHandlerEntreprise} defaultValue={item.codePostale} />
                    <input type="text" className="form-control" name="ville" onChange={changeHandlerEntreprise} defaultValue={item.ville} />
                    <input className="form-control" name="telephone" onChange={changeHandlerEntreprise} defaultValue={item.telephone} />
                    <button className="btn btn-success" type="submit">Modifier </button>

                </form>
            ))}
      </>
    );
}



export default EditEntreprise;