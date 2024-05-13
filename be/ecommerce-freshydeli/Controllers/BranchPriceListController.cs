using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{


    [ApiController]
    [Route("api/BranchPriceList")]
    public class BranchPriceListController:ControllerBase

    {
        private readonly ApplicationDbContext ctx;

        public BranchPriceListController(ApplicationDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet("api/BranchPriceList/{branchId}")]
        public async Task<ActionResult> BranchPriceList(int branchId)
        {
            try { 
           BranchPriceList branchPrice =await  ctx.BranchPriceLists.Where(b=>b.BranchId == branchId).SingleOrDefaultAsync();
            
            List<PriceListProduct> listPriceProduct= await ctx.PriceListProduct.Where(l=>l.PriceListId == branchPrice.PriceListId).Include(lp=>lp.Product).Include(lp=>lp.Product.Iva).Include(lp=>lp.Product.Currency).ToListAsync();

            return Ok(listPriceProduct);
           
            }catch (Exception ex) { 
            return BadRequest(ex.Message);
            }

        }
    }
}
