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

        [HttpGet("api/ClientPriceList/{clientId}")]
        public async Task<ActionResult> ClientPriceList(int clientId)
        {

            try { 

            ClientPriceList clientPriceList = await ctx.ClientPriceList.Where(b => b.Id == clientId).SingleOrDefaultAsync();

            List<PriceListProduct> listPriceProduct = await ctx.PriceListProduct.Where(l => l.Id == clientPriceList.Id).Include(lp => lp.Product).Include(lp => lp.Product.Iva).Include(lp => lp.Product.Currency).ToListAsync();

            return Ok(listPriceProduct);
            }
            catch (Exception ex) {

                return BadRequest(ex.Message);
            }


        }
    } 
}


