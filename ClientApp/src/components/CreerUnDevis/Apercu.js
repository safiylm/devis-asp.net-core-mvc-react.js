import React, { Component } from 'react';
import PorgressBarCreationDevis from './PorgressBarCreationDevis';


export class Apercu extends Component {
    constructor(props) {
        super(props);
     
    }
    render() {
        return (
            <div className="formCreationDevis">

                <PorgressBarCreationDevis numEtape={4} />
            </div>
        );
    }
}



export default Apercu;