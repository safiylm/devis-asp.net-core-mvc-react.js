import { Home } from "./components/Home";
import ListeDevis from './components/ListeDevis/ListeDevis';
import Devis from './components/Devis/Devis';
import Index from './components/CreerUnDevis/Index';
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
        path: '/CreerUnDevis/:id',
        element: < Index />
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
