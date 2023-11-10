namespace devis_asp.net_core_mvc_react.js.Models
{
    public class EntrepriseModel
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Email { get; set; }
        public string Adresse { get; set; }
        public int CodePostale { get; set; }
        public string Ville { get; set; }
        public int Telephone { get; set; }
        public string SiteInternet { get; set; }
        public DateTime DateCreation { get; set; }
    }

}
