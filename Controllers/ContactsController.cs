using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using capstone.Data;
using capstone.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private ApplicationDbContext _context;

        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            var userid = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _context.Contacts.Where(c => c.UserId == userid);
        }

        [HttpGet("{id}")]
        public Contact Get(int id)
        {
            var userid = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _context.Contacts.Where(c => c.UserId == userid && c.Id == id).FirstOrDefault();
        }

        [HttpPost]

        public Contact Post([FromBody]Contact contact)
        {
            var userid = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            contact.UserId = userid; //assioc w/ front end
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return contact;
        }

        [HttpDelete("{id}")] 
        public Contact Delete(int id)
        {
            var userid = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var contact = _context.Contacts.FirstOrDefault(c => c.UserId == userid && c.Id == id);
            if(contact == null)
            {
                return null;
            }
            _context.Contacts.Remove(contact);
            _context.SaveChanges();
            return contact;
      

        }
    }
}
