using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using devis_asp.net_core_mvc_react.js.Models;

namespace devis_asp.net_core_mvc_react.js.Data
{
    public class DevisContext : DbContext
    {
        public DevisContext (DbContextOptions<DevisContext> options)
            : base(options)
        {
        }
        public DbSet<DevisModel> DevisModel { get; set; } = default!;
        public DbSet<AuteurModel> AuteurModel { get; set; }
        public DbSet<UserModel> UserModel { get; set; }
        public DbSet<ClientModel> ClientModel { get; set; }
        public DbSet<ProduitModel> ProduitModel { get; set; } = default!;
    }
}
