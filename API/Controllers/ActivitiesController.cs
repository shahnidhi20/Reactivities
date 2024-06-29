using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
       
        public ActivitiesController(DataContext context)
        {
            _context = context;
         
            
        }

        [HttpGet] //api/activites
        public async Task<ActionResult<List<Activity>>> GetActivities ()
        {
            return await _context.Activities.ToListAsync();
        }

      [HttpGet("{id}")] //api/activites/fdsfdsfdsfdsf
        public async Task<ActionResult<Activity>> GetActivities(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        } 
    }
}