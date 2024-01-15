import React, { useState } from 'react';
import MenuVerticale from '../MenuVerticale/MenuVerticale.js'
import '../../styles/commencer-add-devis.css'
import { Navigate } from "react-router-dom";

const Commencer = () => {

    const [IdDevis, setIdDevis] = useState(false);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const genererId = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const h = today.getHours();
        const m = today.getMinutes();
        const s = today.getSeconds();
        const ms = today.getMilliseconds();
        const currentDate = year+"-"+month+"-"+date+"-"+h+"-"+m+""+s+"-"+ms;
        
        setIdDevis(currentDate +"-safi")
        setSuccess(true)
    }
   

    return (
        <div className="page-formCreationDevis">
            <MenuVerticale />

            <div className="formCreationDevis" >

                <div className="div-creer-devis">
                    <h1>Créer un nouveau devis </h1><br/>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p><br />
                    <button id='btn-commencer' className="btn btn-success" onClick={() => setShow(true)} > Créer / Commencer  </button>
                </div>

                {show &&
                    <div className="div-commencer-show" >
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <button type="button" onClick={genererId} className="btn btn-success" style={{ width: "420px" }}> Créer un devis </button>
                    </div>
                }


                {success && <Navigate to={{ pathname: `/CreerUnDevis/${IdDevis}` }} replace={true} />}
                {/*{success && <Navigate to={{ pathname: `/CreerUnDevis" ,  search: `?id=${IdDevis}` }} replace={true} />}*/}

           </div>
        </div>
    );


}


export default Commencer;