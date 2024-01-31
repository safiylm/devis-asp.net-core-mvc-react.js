import React, { useState, useEffect } from 'react'
import PDF, { Text, AddPage, Line, View, Table, Html } from 'jspdf-react'
import jsPDF from 'jspdf';
import { useRef } from 'react';

const DevisPDF = () => {
    const reportTemplateRef = useRef(null);

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });

        doc.setFont('Inter-Regular', 'normal');

        doc.html(reportTemplateRef.current, {
            async callback(doc) {
                await doc.save('devispdfessai');
            },

        });
    };

    const [clients, setClients] = useState([]);
    fetch(`http://localhost:44453/Client/GetById?id=1004`)
        .then((res) => res.json())
        .then((data) => setClients(data));



 
    const invisibleStyle = {
        display: 'none',
    };

    const properties = { header: 'Acme' }
    const head = [["Quantite", "Designation", "Prix Unitaire HT", "TVA", "Prix TTC"]]
 


    //const text = clients.map((item) => { return item.nom + " " + item.prenom })


    var client = clients.map(function (p, i) {
        return (
            <> <div >{p.nom} { p.prenom}</div> </>
        )
    })

    var textee = <Text x={35} y={35} size={20}>weshh</Text>


    var texteeee = clients.map(function (p, i) {
        return (
            <Text key={p.id }>pp</Text> 
       )
    })

    return (
       
            <>
            <PDF properties={properties} preview={true}>
                    <Text x={35} y={25} size={40}>Facture n°85641258</Text>

              

                <Table head={head} body={head} />

                    <AddPage format='a6' orientation='l' />
                    <Text x={10} y={10} color='red'>Sample</Text>
                    <Line x1={20} y1={20} x2={60} y2={20}/>
                    <AddPage />
                <Html sourceById='page'                />
                </PDF>

            <div id="page">
                <p> 
                    <button className="button" onClick={handleGeneratePdf}>
                        Generate PDF
                    </button>
                    <div ref={reportTemplateRef}>
                    <strong>lorem {client} </strong>

                    </div>

                    </p>
                </div>
            </>

        )
    
}

export default DevisPDF;