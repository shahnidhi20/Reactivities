using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using System.Net.Http.Headers;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {


        [HttpGet] //api/activites
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/activites/fdsfdsfdsfdsf
        public async Task<ActionResult<Activity>> GetActivities(Guid id)
        {
            return await Mediator.Send(new Details.Query { id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command { Activity = activity });
            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }

    }
}