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

        //, string Prenom, string Email, string Adresse , int CodePostale, string Ville, int Telephone
        [HttpGet]
        public IActionResult Create([FromQuery] string nom)//Identifiant du devis 
        {
            ClientModel person = new ClientModel
            {
                Nom = nom,
                Prenom = "Wewh",
                Email = "Wewh@gmail.com",
                Adresse = "9 rue Casip",
                CodePostale = 1200,
                Ville = "Reims",
                Telephone = 011111111,
                DateCreation = DateTime.Now
            };

            return RedirectToAction(nameof(Index));
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create(/*[Bind("Id,Nom,Prenom,Email,Adresse,CodePostale,Ville,Telephone,DateCreation,DevisId")] ClientModel clientModel*/)
        //{
        //    //if (ModelState.IsValid)
        //    //{
        //    //    _context.Add(clientModel);
        //    //    await _context.SaveChangesAsync();
        //    //    return RedirectToAction(nameof(Index));
        //    //}
        //    Console.WriteLine(HttpContext.Request.Body);
        //    return View();
        //}

        // GET: Client/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ClientModel == null)
            {
                return NotFound();
            }

            var clientModel = await _context.ClientModel.FindAsync(id);
            if (clientModel == null)
            {
                return NotFound();
            }
            return View(clientModel);
        }

        // POST: Client/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Prenom,Email,Adresse,CodePostale,Ville,Telephone,DateCreation,DevisId")] ClientModel clientModel)
        {
            if (id != clientModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(clientModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClientModelExists(clientModel.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(clientModel);
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
