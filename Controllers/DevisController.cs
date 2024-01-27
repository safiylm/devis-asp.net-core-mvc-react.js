using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using devis_asp.net_core_mvc_react.js.Data;
using devis_asp.net_core_mvc_react.js.Models;

namespace devis_asp.net_core_mvc_react.js.Controllers
{
    public class DevisController : Controller
    {
        private readonly DevisContext _context;

        public DevisController(DevisContext context)
        {
            _context = context;
        }

        public IActionResult Index([FromQuery] int id, [FromForm] int tempId,  [FromQuery] int clientId, [FromQuery] int entrepriseId)
        {

            return View();
        }

        public IActionResult GetAll()
        {
            return Json( _context.DevisModel.ToList() );
        }
     

        public IActionResult GetById([FromQuery] int id)//Identifiant du devis 
        {
            return Json(_context.DevisModel.Where(devis => devis.Id == id).ToList() );
        }


        [HttpPost]
        [Route("Devis/Create")]
        public async Task<object> CreateAsync([FromHeader] string token, [FromForm] DevisModel data)
        {
            var res = "Erreur (ajouter Devis )";
           
            data.DateCreation = DateTime.Now;
            if (data != null && data.Motif != null && data.DateCreation != null && data.UserId != 0)
            {

                _context.DevisModel.Add(data);
                await _context.SaveChangesAsync();
                
                return Json(_context.DevisModel.Where(devis => devis.DateCreation == data.DateCreation)
                    .Where(devis => devis.UserId == data.UserId).ToList() );

            }
            return Json(res);
        }





        // POST: Devis/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Route("Devis/Edit")]
        public async Task<object> Edit(int? id, [FromForm] DevisModel data)
        {
            var res = "Erreur Modification Devis ";

            var ancien = _context.DevisModel.AsNoTracking().Where(e => e.Id == id).FirstOrDefault();

            if (data.TempId == null) { data.TempId = ancien.TempId; }
            if (data.EntrepriseId == 0) { data.EntrepriseId = ancien.EntrepriseId; }
            if (data.ClientId == 0) { data.ClientId = ancien.ClientId; }
            if (data.UserId == 0) { data.UserId = ancien.UserId; }
            if (data.TotalHT == 0) { data.TotalHT = ancien.TotalHT; }
            if (data.TotalTVA == 0) { data.TotalTVA = ancien.TotalTVA; }
            if (data.Motif == null) { data.Motif = ancien.Motif; }
            if (data.InformationSuplementaire == null) { data.InformationSuplementaire = ancien.InformationSuplementaire; }
            if (data.AccompteInformations == null) { data.AccompteInformations = ancien.AccompteInformations; }
            if (data.AccompteQuantite == 0) { data.AccompteQuantite = ancien.AccompteQuantite; }
            if (data.AccomptePourcentage == 0) { data.AccomptePourcentage = ancien.AccomptePourcentage; }
            data.DateCreation = DateTime.Now;


            if (data != null && data.Id != 0 &&
                data.Motif != null && data.ClientId != 0 
                && data.ClientId !=0 && data.EntrepriseId!=0 &&
                data.UserId !=0 && data.TotalHT !=0 &&
                data.InformationSuplementaire !=null
                && data.TotalTVA != 0 && data.TempId != "")
            {
                try
                {
                     res = "Devis modifié avec success";

                    _context.DevisModel.Update(data);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DevisModelExists(data.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
    
             return Json(res);
    }


        // POST: Devis/Delete/5
        [HttpPost]
        [Route("Devis/Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var res = "Erreur Modification Devis ";


            if (_context.DevisModel == null)
            {
                return Problem("Entity set 'DevisContext.DevisModel'  is null.");
            }
            var devisModel = await _context.DevisModel.FindAsync(id);

            var prod = await _context.ProduitModel.Where((p) => p.DevisId == devisModel.TempId).ToListAsync();
         

            if (devisModel != null )
            {
                res = "True";
                _context.DevisModel.Remove(devisModel);
                foreach (ProduitModel produitModel in prod)
                {
                    _context.ProduitModel.Remove(produitModel);

                }
            }
            
            await _context.SaveChangesAsync();
            return Json(res);
        }

        private bool DevisModelExists(int id)
        {
          return (_context.DevisModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
