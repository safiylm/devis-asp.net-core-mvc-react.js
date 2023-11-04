import React, {  useState } from 'react';

 const ListeDB = () => {

     const [produits, setProduit] = useState([]);
     const [auteurs, setAuteur] = useState([]);
     const [clients, setClient] = useState([]);
     const [devis, setDevis] = useState([]);
     const [users, setUser] = useState([]);


     //fetch('http://localhost:44453/Auteur/getAll')
     //    .then((res) => res.json())
     //    .then((data) => setAuteur(data));

     fetch('http://localhost:44453/Client/getAll')
         .then((res) => res.json())
         .then((data) => setClient(data));

     fetch('http://localhost:44453/Devis/getAll')
         .then((res) => res.json())
         .then((data) => setDevis(data));

     fetch('http://localhost:44453/Produit/getAll')
         .then((res) => res.json())
         .then((data) => setProduit(data));

     fetch('http://localhost:44453/User/getAll')
         .then((res) => res.json())
         .then((data) => setUser(data));

   
     return (
        <div>
            <div>
                <h1>Liste de produit </h1>
             {(produits.length > 0) ?
                 produits.map((item) => (
                     <li key={item.id}>
                       
                      {JSON.stringify(item)}  
                     </li>
                 )):
                 <div>Loading ...</div>
             }
         </div>
          <div>
                <h1>Liste de client </h1>
                 {(clients.length > 0) ?
                     clients.map((item) => (
                     <li key={item.id}>
                       
                       {JSON.stringify(item, null, 2)}     
            
                     </li>
                 )):
                 <div>Loading ...</div>
             }
             </div>

             {/*<div>*/}
             {/*    <h1>Liste de auteurs </h1>*/}
             {/*    {(auteurs.length > 0) ?*/}
             {/*        auteurs.map((item) => (*/}
             {/*            <li key={item.id}>*/}

             {/*                {JSON.stringify(item, null, 2)}*/}

             {/*            </li>*/}
             {/*        )) :*/}
             {/*        <div>Loading ...</div>*/}
             {/*    }*/}
             {/*</div>*/}

             <div>
                 <h1>Liste de devis </h1>
                 {(devis.length > 0) ?
                     devis.map((item) => (
                         <li key={item.id}>

                             {JSON.stringify(item, null, 2)}

                         </li>
                     )) :
                     <div>Loading ...</div>
                 }
             </div>

             <div>
                 <h1>Liste de users </h1>
                 {(users.length > 0) ?
                     users.map((item) => (
                         <li key={item.id}>

                             {JSON.stringify(item, null, 2)}

                         </li>
                     )) :
                     <div>Loading ...</div>
                 }
             </div>
           
         </div>
        );
 
}

export default ListeDB;