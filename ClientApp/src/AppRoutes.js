import { Home } from "./components/Home";
import ListeDevis from './components/Devis/ListeDevis';
import Devis from './components/Devis/Index';
import Create from './components/Devis/Create';
import Inscription from './components/Auth/Inscription'
import Connexion from './components/Auth/Connexion';
import MesDonneesPersonnelles from './components/MonCompte/MesDonneesPersonnelles';
import DevisPDF from './components/Devis/DevisPDF';
import EditDevis from "./components/Devis/Edit"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
        path: '/Auth/Inscription',
        element: < Inscription />
    },
    {
        path: '/Auth/Connexion',
        element: < Connexion />
    },
    {
        path: '/MonCompte/MesDonneesPersonnelles',
        element: < MesDonneesPersonnelles />
    },
   
    {
        path: '/Devis/Create/:id',
        element: < Create />
    },
    {
        path: '/Devis/Edit/:id/:tempId/:clientId/:entrepriseId',
        element: < EditDevis />
    },
    {
        path: '/ListeDevis',
        element: < ListeDevis />
    }, 
    {
        path: '/Devis/:id/:tempId/:clientId/:entrepriseId',
        element: < Devis />
    }, {
        path: '/a',
        element: < DevisPDF />
    }
];

export default AppRoutes;
