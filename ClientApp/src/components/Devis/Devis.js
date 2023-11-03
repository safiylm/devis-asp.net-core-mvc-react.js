import React, { useState } from "react"
import { useParams } from "react-router-dom";
 

const Devis = () => {

    const [produits, setProduit] = useState([]);
    let id = useParams()

    console.log("id-->", id)

    fetch('http://localhost:44453/Devis/GetById?id=1')
        .then((res) => res.json())
        .then((data) => setProduit(data));

    console.log(produits);
    return (
     
        <div> 
            <h1>Liste de Devis </h1>
            {(produits.length > 0) ?
                produits.map((item) => (
                    <li key={item.id}>
                       {JSON.stringify(item, null, 2)}
                   </li>
                )) :
                <div>Loading ...</div>
            }
         
        </div>
    );
}



export default Devis;