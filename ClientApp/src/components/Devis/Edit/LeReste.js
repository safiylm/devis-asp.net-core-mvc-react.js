import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditDevisLeReste = () => {
  const [success, setSuccess] = useState(false);
    const devisId = 2029;
    const [devis, setDevis] = useState([]);

    const [formdevis, setFormDevis] = useState({
        tempId: 98465132,
        motif: "",
        clientId: 4005,
        entrepriseId: 1,
        userId: 21,
        totalTVA: 6666,
        totalHT: 6666,
        accompteQuantite: 0,
        accomptePourcentage:0 ,
        accompteInformations: "",
        informationSuplementaire: "",
        dateCreation: Date.now
    });

    useEffect(() => {
        fetch(`http://localhost:44453/Devis/GetById?id=${devisId}`)
            .then((res) => res.json())
            .then((data) => setDevis(data))
    }, []); 

    devis.forEach((item) => {
        formdevis.motif = item.motif
        formdevis.accomptePourcentage = item.accomptePourcentage
        formdevis.accompteQuantite = item.accompteQuantite
        formdevis.accompteInformations = item.accompteInformations
        formdevis.informationSuplementaire = item.informationSuplementaire
       
    })



    const changeHandler = (e) => {
        setFormDevis({ ...formdevis, [e.target.name]: e.target.value })
    }

    const editDevisSubmit = (event) => {
        let formData = new FormData();
        Object.keys(formdevis).forEach(function (key) {
            formData.append(key, formdevis[key]);
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

            request.open("POST", "Devis/Edit", false);
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
            <h1>Modifier </h1>
            <form onSubmit={editDevisSubmit }>
                <label>Motif du devis :
                    <input type="text" name="motif" className="form-control" onChange={changeHandler} defaultValue={formdevis.motif } />
                </label><br />
                <label>Accompte pourcentage :
                    <input name="accomptePourcentage" className="form-control" onChange={changeHandler} defaultValue={formdevis.accomptePourcentage} />
                </label><br />
                <label>Accompte quantitée :
                    <input name="accompteQuantite" className="form-control" onChange={changeHandler} defaultValue={formdevis.accompteQuantite} />
                </label><br />
                <label>Accompte informations :
                    <input name="accompteInformations" className="form-control" onChange={changeHandler} defaultValue={formdevis.accompteInformations} />
                </label><br />
                <label>Informations suplémentaires :
                    <input name="informationSuplementaire" className="form-control" onChange={changeHandler} defaultValue={formdevis.informationSuplementaire } />
                </label><br />
                <p>Mode de paiement </p>
                <button type="submit" className="btn btn-success">Enregistrer et terminer</button>

            </form>
      </>
    );
}



export default EditDevisLeReste;