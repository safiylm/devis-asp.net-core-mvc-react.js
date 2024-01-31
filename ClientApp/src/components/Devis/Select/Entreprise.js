import React, {  useState, useEffect} from 'react';

const ListeEntreprise = ({ idEntreprise, setIdEntreprise, changeNumEtape }) => {

    const [entreprises, setEntreprise] = useState([])
 
    useEffect(() => {

        fetch('http://localhost:44453/Entreprise/getAll')
            .then((res) => res.json())
            .then((data) => setEntreprise(data));
    },[])

    const onChange = (e) => {
        setIdEntreprise(e.target.value)
    }

    const submitChoisirEntreprise = () => {
        changeNumEtape(2);

    }
    return (

        <div style={{ width: "100%" }}>
            <form onSubmit={submitChoisirEntreprise}>
                <h3 style={{ textAlign: "center" }}>Choisir parmi une entreprise enregistrée </h3>
                <div class="flex-center-wrap-row border">
                {(entreprises.length > 0) ?
                    entreprises.map((item) => (
                        <div key={item.id}>

                            {(idEntreprise == item.id) ?
                                <label>
                                    <input type="radio" name="entreprisechoose"
                                        onChange={onChange} value={item.id} checked />
                                    {item.nom} <br /> {item.email} <br />{item.ville}

                                </label>
                                :
                                <label>
                                    <input type="radio" name="entreprisechoose"
                                        onChange={onChange} value={item.id} />
                                    {item.nom} <br /> {item.email} <br />{item.ville}

                                </label>
                            }
                        </div>
                ))
                        : <p> Chargement des entreprises ...</p>}
                </div>

            <button type="submit" className="btn btn-primary"> Choisir </button>
            </form>
        </div>
           
    );
}

export default ListeEntreprise;