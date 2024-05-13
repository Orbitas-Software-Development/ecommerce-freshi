using AutoMapper;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/currency")]
    public class CurrencyController:ControllerBase
    {
        ApplicationDbContext Context;
        IMapper Mapper;
        public CurrencyController(IMapper mapper, ApplicationDbContext context)
        {
            this.Mapper = mapper;
            this.Context = context;
        }
        [HttpGet("getCompanyCurrency")]
        public async Task<IActionResult> GetCurrencyByCompanyId()
        {
            
              List<Currency> currencies=await Context.Currency.ToListAsync();

                return Ok(currencies);


        }
    }
}
