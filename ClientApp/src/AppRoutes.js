import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import ListeDB from './components/ListeDB';
import SaisirUnAuteur from './components/CreerUnDevis/SaisirUnAuteur';
import SaisirUnClient from './components/CreerUnDevis/SaisirUnClient';
import SaisirLesProduits from './components/CreerUnDevis/SaisirLesProduits';
import ListeDevis from './components/ListeDevis/ListeDevis';
import Devis from './components/Devis/Devis';
import Apercu from './components/CreerUnDevis/Apercu';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter/:id',
    element: <Counter />
    },
    {
      path: '/ListeDB',
        element: < ListeDB />
    },
    {
        path: '/Devis/CreerUnDevis/SaisirUnAuteur',
        element: < SaisirUnAuteur />
    },
    {
        path: '/Devis/CreerUnDevis/SaisirUnClient',
        element: < SaisirUnClient />
    },
    {
        path: '/Devis/CreerUnDevis/SaisirLesProduits',
        element: < SaisirLesProduits />
    },
    {
        path: '/Devis/CreerUnDevis/Apercu',
        element: < Apercu />
    },
    {
        path: '/ListeDevis',
        element: < ListeDevis />
    }, 
    {
        path: '/Devis/:id',
        element: < Devis />
    }
];

export default AppRoutes;
