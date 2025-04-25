using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{


    [ApiController]
    [Route("api/ClientPriceList")]
    public class ClientPriceListController : ControllerBase

    {
        private readonly ApplicationDbContext ctx;

        public ClientPriceListController(ApplicationDbContext ctx)
        {
            this.ctx = ctx;
        }

   


        [HttpGet("getClientPriceListByClientId/{clientId}")]
        public async Task<ActionResult> GetClientPriceListByClientId(int clientId)
        {

            try
            {
                ClientPriceList ClientPriceList = await ctx.ClientPriceList.AsNoTracking().Where(pl => pl.ClientId == clientId).Include(cp=>cp.PriceList).FirstOrDefaultAsync();
                return Ok(ClientPriceList);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}


