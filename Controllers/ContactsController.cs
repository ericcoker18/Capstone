using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using capstone.Data;
using capstone.Models;
using Microsoft.AspNetCore.Mvc;

namespace capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private string UserId => HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _context.Contacts.Where(c => c.UserId == UserId).ToList();
        }

        [HttpGet("GetAll")]
        public IEnumerable<Contact> GetAll()
        {
            return _context.Contacts.ToList();
        }

        [HttpGet("{id}")]
        public Contact Get(int id)
        {
            return _context.Contacts.FirstOrDefault(c => c.UserId == UserId && c.Id == id);
        }

        [HttpPost]
        public Contact Post([FromBody] Contact contact)
        {
            contact.UserId = UserId; //assioc w/ front end
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return contact;
        }

        [HttpDelete("{id}")]
        public Contact Delete(int id)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.UserId == UserId && c.Id == id);
            if (contact == null)
            {
                return null;
            }

            _context.Contacts.Remove(contact);
            _context.SaveChanges();
            return contact;
        }
    }
}