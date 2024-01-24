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
    public class ClientController : Controller
    {
        private readonly DevisContext _context;

        public ClientController(DevisContext context)
        {
            _context = context;
        }

        public IActionResult GetAll()
        {

            return Json(_context.ClientModel.ToList());

        }

        public IActionResult GetById([FromQuery] int id)//Identifiant du devis 
        {
            return Json(_context.ClientModel.Where(client => client.Id == id).ToList());
        }



        // GET: Client
        public async Task<IActionResult> Index()
        {
            return _context.ClientModel != null ?
                        View(await _context.ClientModel.ToListAsync()) :
                        Problem("Entity set 'DevisContext.ClientModel'  is null.");
        }

        // GET: Client/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.ClientModel == null)
            {
                return NotFound();
            }

            var clientModel = await _context.ClientModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (clientModel == null)
            {
                return NotFound();
            }

            return View(clientModel);
        }



        [HttpPost]
        [Route("Client/Create")]
        public object Create([FromHeader] string token, [FromForm] ClientModel data)
        {
            var res = "Erreur (ajouter client )";
            // check token
            // do something with data
            if (data != null && data.Email != null &&
                data.Nom != null && data.Prenom != null &&
                data.Adresse != null && data.CodePostale != 0 &&
               data.Ville != null && data.Telephone != 0) {
                data.DateCreation = DateTime.Now;
                _context.ClientModel.Add(data);
                _context.SaveChangesAsync();
                res = "Votre Client a été enregistré avec succès!";
            }
            return Json(res);
        }



        [HttpPost]
        [Route("Client/Edit")]

        public object Edit( [FromForm] ClientModel data)
        {
            var res = "Erreur, les données de votre client n'a pas été modifier.";
            if (data != null && data.Email != null &&
             data.Nom != null && data.Prenom != null &&
             data.Adresse != null && data.CodePostale != 0 &&
            data.Ville != null && data.Telephone != 0)
            {
                //if (ModelState.IsValid) {
                try
                {
                    _context.ClientModel.Update(data);
                     _context.SaveChangesAsync();               
                    res = "Les données de votre client a été modifier avec succès!";

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClientModelExists(data.Id))
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

        // GET: Client/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ClientModel == null)
            {
                return NotFound();
            }

            var clientModel = await _context.ClientModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (clientModel == null)
            {
                return NotFound();
            }

            return View(clientModel);
        }

        // POST: Client/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.ClientModel == null)
            {
                return Problem("Entity set 'DevisContext.ClientModel'  is null.");
            }
            var clientModel = await _context.ClientModel.FindAsync(id);
            if (clientModel != null)
            {
                _context.ClientModel.Remove(clientModel);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ClientModelExists(int id)
        {
          return (_context.ClientModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
