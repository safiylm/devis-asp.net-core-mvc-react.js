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
    public class UserController : Controller
    {
        private readonly DevisContext _context;

        public UserController(DevisContext context)
        {
            _context = context;
        }

        public IActionResult GetAll()
        {
            return Json(_context.UserModel.ToList());
        }

       
        public IActionResult GetById([FromQuery] int id)//Identifiant du devis 
        {
            return Json(_context.UserModel.Where((u) => u.Id == id).ToList());
        }



        [HttpPost]
        [Route("User/Inscription")]
        public object Inscription([FromHeader] string token, [FromForm] UserModel data)
        {
            var res = "Création de compte utilisateur a échoué.";

            if (data != null && data.Email != null &&
                data.Nom != null && data.Prenom != null && data.Password != null &&
                data.Telephone != 0)
            {
                _context.UserModel.Add(data);
                _context.SaveChangesAsync();
                res = "Votre compte utilisateur a été enregistré avec succès!";
            }
            return Json(res);
        }

        [HttpPost]
        [Route("User/Connexion")]
        public object Connexion([FromHeader] string token, [FromForm] UserModel data)
        {
            var res = "Connexion de compte utilisateur a échoué.";
           
            if (data != null && data.Email != null && data.Password != null )
            {
                if (_context.UserModel.Where((u) => u.Email == data.Email).Where((u => u.Password == data.Password)).ToList().Count() > 0)
                {
                    return Json(_context.UserModel.Where((u) => u.Email == data.Email).Where((u => u.Password == data.Password)).ToList());
                }
                return Json(res);
            }
            return Json(res);
        }



        // GET: User/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.UserModel == null)
            {
                return NotFound();
            }

            var userModel = await _context.UserModel.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }
            return View(userModel);
        }

      

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Prenom,Email,Password,Telephone,DateCreation")] UserModel userModel)
        {
            if (id != userModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserModelExists(userModel.Id))
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
            return View(userModel);
        }



        // GET: User/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.UserModel == null)
            {
                return NotFound();
            }

            var userModel = await _context.UserModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userModel == null)
            {
                return NotFound();
            }

            return View(userModel);
        }

       
        
        // POST: User/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.UserModel == null)
            {
                return Problem("Entity set 'DevisContext.UserModel'  is null.");
            }
            var userModel = await _context.UserModel.FindAsync(id);
            if (userModel != null)
            {
                _context.UserModel.Remove(userModel);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }



        private bool UserModelExists(int id)
        {
          return (_context.UserModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
