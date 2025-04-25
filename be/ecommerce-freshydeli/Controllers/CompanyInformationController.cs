using AutoMapper;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/companyInformation")]
    public class CompanyInformationController:ControllerBase
    {
        ApplicationDbContext context;
        IMapper mapper; 
        public CompanyInformationController(ApplicationDbContext context,IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet("getInfo/{CompanyId}")]
        public  async Task<IActionResult> GetInformation(int CompanyId)
        {

            CompanyInformation companyInformation=await context.CompanyInformation.AsNoTracking().Where(ci=>ci.CompanyId==CompanyId).FirstOrDefaultAsync();
            if(companyInformation==null)
            {
                return BadRequest(new { information=false});
            }

            return Ok(new { information = companyInformation });
        }

        [HttpPost("saveInfo")]
        public async Task<IActionResult> SaveInformation(CompanyInformation companyInformationRequest)
        {

            //AsNoTracking() para tener mas de una instancia de un mismo tipo
            CompanyInformation companyInformation = await context.CompanyInformation.Where(ci => ci.CompanyId == companyInformationRequest.CompanyId).AsNoTracking().FirstOrDefaultAsync();
            if (companyInformation == null)
            {

              await   context.AddAsync(companyInformationRequest);
              await   context.SaveChangesAsync();

                return Ok(new { information = companyInformationRequest });
            }
            context.Update(companyInformationRequest);
            await context.SaveChangesAsync();
            return Ok(new { information = companyInformationRequest });
        }
    }
}
