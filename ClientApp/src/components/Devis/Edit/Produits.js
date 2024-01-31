import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditProduits = ({ tempid_, changeNumEtape, setTotalHT, setTotalTVA }) => {

    const [showEditOneProductId, setShowEditOneProduct] = useState(0)
    const [message, setMessage] = useState("");
    const [produits, setProduit] = useState([]);
    const [formAddProduct, setFormAddProduct] = useState({
       /* id: 0,*/ devisId: tempid_, quantite: "0", designation: "-",
        prixUnitaireHT: "0", tva: "20"
    });
    const [formEditProduct, setFormEditProduct] = useState({
        id: 0, devisId: tempid_, quantite: "0", designation: "-",
        prixUnitaireHT: "0", tva: "20"
    });

    useEffect(() => {
        fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
            .then((res) => res.json())
            .then((data) => setProduit(data));
   }, []); 


    const goEditProduit = (id) => {
        setShowEditOneProduct(id)

        produits.forEach((item) => {

            if (item.id == id) {
                formEditProduct.id = item.id
                formEditProduct.quantite = item.quantite
                formEditProduct.designation = item.designation
                formEditProduct.prixUnitaireHT = item.prixUnitaireHT
                formEditProduct.tva = item.tva
            }
        })
    }


    const changeHandlerEdit = (e) => {
        setFormEditProduct({ ...formEditProduct, [e.target.name]: e.target.value })
    }


    const changeHandlerAdd = (e) => {
        setFormAddProduct({ ...formAddProduct, [e.target.name]: e.target.value })
    }

    const sommePrixTVA = produits.map(item => item.tva).reduce((prev, curr) => prev + curr, 0);
    const sommePrixHT = produits.map(item => item.prixUnitaireHT).reduce((prev, curr) => prev + curr, 0);
    const sommeTotale = sommePrixTVA + sommePrixHT;

    const submitCreationProduit = (event) => {
        //Send Post 
        setTotalHT(sommePrixHT)
        setTotalTVA(sommePrixTVA)

        let formData = new FormData();
        Object.keys(formAddProduct).forEach(function (key) {
            formData.append(key, formAddProduct[key]);
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

            request.open("POST", "Produit/Create", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    document.querySelectorAll("form input").forEach((e) => {
                        e.value = "";
                    })
                    fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
                        .then((res) => res.json())
                        .then((data) => setProduit(data));


                }
            }.bind(this);
            request.send(formData);
        }
    }

    const submitEditProduit = (event) => {
        //Send Post 
        setTotalHT(sommePrixHT);
        setTotalTVA(sommePrixTVA);
        formEditProduct.devisId = tempid_;
        let formData = new FormData();
        Object.keys(formEditProduct).forEach(function (key) {
            formData.append(key, formEditProduct[key]);
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

            request.open("POST", `Produit/Edit?id=${tempid_}`, false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
                        .then((res) => res.json())
                        .then((data) => setProduit(data));
                }
            }.bind(this);
            request.send(formData);
        }
    }

    const submitDeleteProduit = () => {
        //Send Post 
        setTotalHT(sommePrixHT);
        setTotalTVA(sommePrixTVA);
        formEditProduct.devisId = tempid_;
        let formData = new FormData();
        Object.keys(formEditProduct).forEach(function (key) {
            formData.append(key, formEditProduct[key]);
        });

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

            request.open("POST", `Produit/Delete?id=${showEditOneProductId}`, false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
                        .then((res) => res.json())
                        .then((data) => setProduit(data));

                }
            }.bind(this);
            request.send(formData);
        }
    }

    const [formdevis, setFormDevis] = useState({
        tempId: tempid_,
        motif: "",
        clientId: 0,
        entrepriseId: 0,
        userId: 0,
        totalTVA: sommePrixTVA,
        totalHT: sommePrixHT,
        accompteQuantite: 0,
        accomptePourcentage: 0,
        accompteInformations: "",
        informationSuplementaire: "",
    });

    const url_ = window.location.pathname;
    const arrayURL = url_.split("/");
    const id = arrayURL[3];
    const clientId_param = arrayURL[5];
    const entrepriseId_param = arrayURL[6];

    const sauvegarderLesProduits = () => {
        setTotalHT(sommePrixHT);
        setTotalTVA(sommePrixTVA);
        formdevis.Id = id; 
        formdevis.tempId = tempid_;
        formdevis.clientId = clientId_param;
        formdevis.entrepriseId = entrepriseId_param;
        formdevis.userId = 22;
        formdevis.totalTVA = sommePrixTVA;
        formdevis.totalHT = sommePrixHT;
        let formData = new FormData();
        Object.keys(formdevis).forEach(function (key) {
            formData.append(key, formdevis[key]);
        });

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

            request.open("POST", `Devis/Edit?id=${id}`, false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    changeNumEtape(4);
               }
            }.bind(this);
            request.send(formData);
        }
    }

    return (
        <div>
            <h3>Liste des produits</h3>
            <table style={{ width: "60vw" }}>
                <thead>
                    <tr>
                        <th>Quantite</th>
                        <th>Designation</th>
                        <th>Prix Unitaire HT</th>
                        <th>Prix TVA</th>
                    </tr>
                </thead>
                <tbody>
                    {(produits.length > 0) ?
                        produits.map((item) => (
                          <>  <tr key={item.id}>
                                <td>{item.quantite}</td>
                                <td>{item.designation}</td>
                                <td>{item.prixUnitaireHT} $ </td>
                                <td>{item.tva} $ </td>
                                {showEditOneProductId != item.id && <>
                                    <td> <button className="btn btn-primary" onClick={ () => goEditProduit(item.id) }> Modifier</button> </td>
                                   
                                </>}
                            </tr>
                                 
                                {showEditOneProductId == item.id &&
                                    <tr>
                                        <td colspan="4"> <form className="div-ajouter-un-produit" onSubmit={submitEditProduit }>
                                            <input type="hidden" name="id" onChange={changeHandlerEdit} defaultValue={item.id} />           
                                            <input name="quantite" onChange={changeHandlerEdit} className="form-control" defaultValue={formEditProduct.quantite} />           
                                            <input name="designation" onChange={changeHandlerEdit} className="form-control" defaultValue={formEditProduct.designation} />
                                            <input name="prixUnitaireHT" onChange={changeHandlerEdit} className="form-control" defaultValue={formEditProduct.prixUnitaireHT} />
                                            <input name="tva" onChange={changeHandlerEdit} className="form-control" defaultValue={formEditProduct.tva} />
                                            <button type="submit" className="btn btn-primary"> Save </button>
                                            <button type="button" className="btn btn-light" onClick={() => setShowEditOneProduct(0)}> Annuler</button>
                                            <button className="btn btn-danger" onClick={() => submitDeleteProduit()}> Supprimer </button> 
                                        </form>
                               </td> </tr>}
                               

                        
                            </>
                        )) :
                        <tr><td>Aucun produit crée </td></tr>
                    }
                </tbody>
            </table>

       

            <form onSubmit={submitCreationProduit} className="div-ajouter-un-produit" style={{ width: "60vw" }}>

                <input name="quantite" onChange={changeHandlerAdd} className="form-control" placeholder="Quantité" />
                <input name="designation" onChange={changeHandlerAdd} className="form-control" placeholder="Désignation" />
                <input name="prixUnitaireHT" onChange={changeHandlerAdd} className="form-control" placeholder="Prix Unitaire HT" />
                <input name="tva" onChange={changeHandlerAdd} className="form-control" placeholder="TVA" />
                <button type="submit" className="btn btn-primary"> Save </button>

            </form>
            <p style={{color: "red"} }>{message}</p>

            <br />

            <h4>Somme TVA: {sommePrixTVA} $</h4>
            <h4>Somme Hors Taxe: {sommePrixHT} $ </h4>
            <h1>Montant Total: {sommeTotale} $</h1>
            <button type="button" className="btn btn-primary" onClick={ sauvegarderLesProduits}> Terminer et sauvegarder </button>

        </div>
    );
}



export default EditProduits;