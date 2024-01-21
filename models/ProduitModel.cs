namespace devis_asp.net_core_mvc_react.js.Models
{
    public class ProduitModel
    {
        public int Id { get; set; }
        public int Quantite { get; set; }
        public string Designation { get; set; }
        public int PrixUnitaireHT { get; set; }
        public int TVA { get; set; }
        public DateTime DateCreation { get; set; }
        public string DevisId { get; set; }
    }
}
