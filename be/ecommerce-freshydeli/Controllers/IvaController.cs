using AutoMapper;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/iva")]
    public class IvaController : Controller
    {
        IMapper Mapper;

        ApplicationDbContext Context;
        public IvaController(ApplicationDbContext context,IMapper mapper)
        {

            this.Context = context;
            this.Mapper = mapper;
        }

        [HttpGet("getIvaByCompanyId/{companyId}")]
        public async Task<IActionResult> GetIvaByCompanyId(int companyId)
        {
            List<Iva> ivas =await Context.Iva.Where(i=>i.CompanyId == companyId).ToListAsync();

            return Ok(ivas);
        }
        [HttpPost("createIva")]
        public async Task<IActionResult> CreateIva(Iva iva)
        {
            await Context.AddAsync(iva); 
            await Context.SaveChangesAsync();   
            return Ok(iva);
        }
        [HttpPut("updateIva")]
        public async Task<IActionResult> UpdateIva(Iva iva)
        {
            Context.Update(iva);
            await Context.SaveChangesAsync();
            return Ok(iva);
        }
        [HttpDelete("deleteIva/{id}")]
        public async Task<IActionResult>DeleteIva(int id)
        {   
            Iva iva=Context.Iva.Where(i=>i.Id == id).FirstOrDefault();  

            Context.Remove(iva);
            
            List<Iva> ivaList = await Context.Iva.Where(i => i.CompanyId==iva.CompanyId).ToListAsync();
            
            await Context.SaveChangesAsync();

            return Ok(ivaList);
        }
    }
}
