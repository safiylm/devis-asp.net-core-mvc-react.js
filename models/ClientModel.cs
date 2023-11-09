namespace devis_asp.net_core_mvc_react.js.Models
{
    public class ClientModel
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string Adresse { get; set; }
        public int CodePostale { get; set; }
        public string Ville { get; set; }
        public int Telephone { get; set; }

        public DateTime DateCreation { get; set; }
      
    }
}
