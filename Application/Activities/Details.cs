
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }



            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}