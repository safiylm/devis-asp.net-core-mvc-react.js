using Humanizer;
using System;

namespace devis_asp.net_core_mvc_react.js.Models
{
    public class DevisModel
    {

        public int Id { get; set; }
        public string Motif { get; set; }
        public int ClientId { get; set; }
        public int EntrepriseId { get; set; }
        public int UserId { get; set; }
        public int TVATotal  { get; set; }
        public int TotalHT { get; set; }
        public int AccompteQuantite { get; set; }
        public int AccomptePourcentage { get; set; }
        public string AccompteInformations { get; set; }
        public string InformationSuplementaire { get; set; }

        public DateTime DateCreation { get; set; }

    }
}  


 