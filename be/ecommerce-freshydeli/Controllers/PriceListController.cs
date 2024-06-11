using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/priceList")]
    public class PriceListController:ControllerBase
    {
        private readonly ApplicationDbContext ctx;

        public PriceListController(ApplicationDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet("/getListPriceByCompanyId/{companyId}")]
        public async Task<ActionResult>GetListPriceByCompanyId(int companyId) {

            try { 
            List<PriceList> priceList =await ctx.PriceList.Where(pl=>pl.CompanyId==companyId).ToListAsync();

            return Ok(priceList);
            }catch (Exception ex) {
            
                return BadRequest(ex.Message);  
            }
        }



        [HttpPut("updatePriceList")]
        public async Task<ActionResult> UpdatePriceList(PriceList priceList)
        {

            try
            {
                ctx.Update(priceList);
                await ctx.SaveChangesAsync();
                return Ok(priceList);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }



        }
        [HttpPost("createPriceList")]
        public async Task<ActionResult> CreatePriceList(PriceList priceList)
        {

            try
            {
               await ctx.AddAsync(priceList);
                await ctx.SaveChangesAsync();
                return Ok(priceList);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }



        }
        [HttpDelete("deletePriceList/{id}")]
        public async Task<ActionResult> CreatePriceList(int id)
        {

            try
            {
                PriceList priceList = await ctx.PriceList.Where(p => p.Id == id).FirstOrDefaultAsync();
               
                if (priceList==null) return NotFound();
        
                ctx.Remove(priceList);
                await ctx.SaveChangesAsync(); 
                List<PriceList> priceLists = await ctx.PriceList.ToListAsync();
                return Ok(priceLists);
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }
    }
}
