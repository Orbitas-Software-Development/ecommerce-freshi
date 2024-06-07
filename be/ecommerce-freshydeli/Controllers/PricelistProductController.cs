using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/PricelistProduct")]
    public class PricelistProductController: ControllerBase
    {
        private readonly ApplicationDbContext ctx; private readonly IMapper mapper;
        public PricelistProductController(ApplicationDbContext ctx, IMapper mapper)
        {
            this.ctx = ctx;
            this.mapper = mapper;
        }

        [HttpPost("createPricelistProduct")]
        public async Task<ActionResult> CreatePricelistProduct([FromBody] List<PriceListProductDTO> priceListProductDTOs)
        {
            try { 
            List<PriceListProduct> RegisteredPriceListProduct = await ctx.PriceListProduct.Where(plp=>plp.PriceListId== priceListProductDTOs[0].PriceListId).ToListAsync();
            List<PriceListProduct> priceListProducts = mapper.Map<List<PriceListProduct>>(priceListProductDTOs);
            if (RegisteredPriceListProduct.Count == 0) {

                await ctx.PriceListProduct.AddRangeAsync(priceListProducts);

                await ctx.SaveChangesAsync();

                return Ok();
                }

               ctx.PriceListProduct.RemoveRange(RegisteredPriceListProduct);

               await  ctx.PriceListProduct.AddRangeAsync(priceListProducts);

               await ctx.SaveChangesAsync();

                return Ok(priceListProducts);

            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
        [HttpGet("getPricelistProductByPriceListId/{id}")]
        public async Task<ActionResult> GetPricelistProductByPriceListId(int id)
        {
            try
            {
                List<PriceListProduct>priceListProduct = await ctx.PriceListProduct.Where(plp => plp.PriceListId == id).ToListAsync();
            
                return Ok(priceListProduct);

            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
