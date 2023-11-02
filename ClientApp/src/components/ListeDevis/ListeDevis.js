import React, { useState } from 'react';

const ListeDevis = () => {
    const [produits, setProduit] = useState([]);

    fetch('http://localhost:44453/Devis/GetAll')
        .then((res) => res.json()  )
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

export default ListeDevis;