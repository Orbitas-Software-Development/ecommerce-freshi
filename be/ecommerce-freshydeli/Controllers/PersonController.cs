using AutoMapper;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{

    [ApiController]
    [Route("api/cuentas")]
    public class PersonController:ControllerBase
    {
        IMapper Mapper;

        ApplicationDbContext Context;
        public PersonController(ApplicationDbContext context, IMapper mapper)
        {
            this.Context = context;
            this.Mapper = mapper;
        }

        [HttpGet("getPersons")]
        public async Task<IActionResult> getPersons()
        {
            List<Person> persons = await Context.Person.ToListAsync();
            return Ok (persons);
        }
    }
}
