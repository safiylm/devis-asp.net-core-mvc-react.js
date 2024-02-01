import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditProduits = ({ tempid_, changeNumEtape, setTotalHT, setTotalTVA, totalHT, totalTVA}) => {

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
    const calculTotal = () => {

        let sommeHT = 0;
        let sommeTVA = 0;
        produits.forEach((i) => {
            sommeHT = i.prixUnitaireHT * i.quantite + sommeHT;
            sommeTVA = i.tva * i.quantite + sommeTVA
        });
        setTotalHT(sommeHT);
        setTotalTVA(sommeTVA);


        console.log(totalHT)
        console.log(totalTVA)
        console.log('World!');

    }
    calculTotal();

    useEffect(() => {
        fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
            .then((res) => res.json())
            .then((data) => setProduit(data))
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
   
 
    const GoSuivant = () => { changeNumEtape(4) }

    const submitCreationProduit = (event) => {
        //Send Post 
      

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

            request.open("POST", "Produit/Create_", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    document.querySelectorAll("form input").forEach((e) => {
                        e.value = "";
                    })
                    fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
                        .then((res) => res.json())
                        .then((data) => { setProduit(data); calculTotal() })
                }
            }.bind(this);
            request.send(formData);
        }
        return calculTotal();

    }

    const submitEditProduit = (event) => {
        //Send Post 
    
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

            request.open("POST", `Produit/Edit_?id=${tempid_}`, false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
                        .then((res) => res.json())
                        .then((data) => setProduit(data))
                }
            }.bind(this);
            request.send(formData);
        }
        return calculTotal();

    }

    const submitDeleteProduit = () => {
        //Send Post 
       
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

            request.open("POST", `Produit/Delete_?id=${tempid_}`, false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                    fetch(`http://localhost:44453/Produit/GetByDevisId?id=${tempid_}`)
                        .then((res) => res.json())
                        .then((data) => setProduit(data))

                }
            }.bind(this);
            request.send(formData);
        }
        return calculTotal();
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
           

            <h4>Somme TVA: {totalTVA} $</h4>
            <h4>Somme Hors Taxe: {totalHT} $ </h4>
            <h1>Montant Total: {totalTVA + totalHT} $</h1>
            
                  
            <button type="button" className="btn btn-primary" onClick={calculTotal}> calculTotal </button>
            <button type="button" className="btn btn-primary" onClick={GoSuivant}> Suivant </button>
         
        </div>
    );
}



export default EditProduits;