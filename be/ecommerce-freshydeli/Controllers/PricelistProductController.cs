using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

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

        [HttpPost("createPricelistProduct/{priceListId}")]
        public async Task<ActionResult> CreatePricelistProduct([FromBody] List<PriceListProductDTO> priceListProductDTOs,int priceListId)
        {
            try {


            List<PriceListProduct> RegisteredPriceListProduct = await ctx.PriceListProduct.Where(plp=>plp.PriceListId== priceListId).ToListAsync();
            List<PriceListProduct> priceListProducts = mapper.Map<List<PriceListProduct>>(priceListProductDTOs);

                //si la lista viene vacía borre todos los productos de la lista de precios
                if (priceListProductDTOs.Count == 0)
                {
                    ctx.PriceListProduct.RemoveRange(RegisteredPriceListProduct);
                    await ctx.SaveChangesAsync();
                    return Ok(priceListProducts);
                }

                if (RegisteredPriceListProduct.Count == 0) {

                await ctx.PriceListProduct.AddRangeAsync(priceListProducts);

                await ctx.SaveChangesAsync();
                    List<PriceListProduct> updatedPriceListProduct = mapper.Map<List<PriceListProduct>>(priceListProductDTOs);

                    return Ok(updatedPriceListProduct);
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


        [HttpGet("getPriceListProductByProductId/{id}")]
        public async Task<IActionResult> GetPriceListProductByProductId(int id)
        {
            try
            {
                List<PriceListProduct> priceListProduct = await ctx.PriceListProduct.Where(i => i.ProductId == id).ToListAsync();

                return Ok(priceListProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("deletePriceListProductByPriceListId/{id}")]
        public async Task<ActionResult> DeletePriceListProductByPriceListId(int id)
        {
            try
            {
                List<PriceListProduct> priceListProduct = await ctx.PriceListProduct.Where(plp => plp.PriceListId == id).ToListAsync();
                ctx.RemoveRange(priceListProduct);

                return Ok(priceListProduct);

            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpGet("getProductListByClientId/{clientId}")]
        public async Task<ActionResult> ClientPriceList(int clientId)
        {

            try
            {

                ClientPriceList clientPriceList = await ctx.ClientPriceList.Where(b => b.ClientId == clientId).SingleOrDefaultAsync();

                List<PriceListProduct> listPriceProduct = await ctx.PriceListProduct.Where(l => l.PriceListId == clientPriceList.PriceListId).Include(lp => lp.Product).Include(lp => lp.Product.Iva).Include(lp => lp.Product.Currency).ToListAsync();

                return Ok(listPriceProduct);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


        }
    }
}
