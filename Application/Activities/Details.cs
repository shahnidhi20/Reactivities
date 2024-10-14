
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Activity>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }



            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {

                return await _context.Activities.FindAsync(request.id);
            }
        }
    }
}