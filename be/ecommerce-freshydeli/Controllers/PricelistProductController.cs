﻿using AutoMapper;
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

        [HttpPost("createPricelistProduct")]
        public async Task<ActionResult> CreatePricelistProduct([FromBody] List<PriceListProductDTO> priceListProductDTOs,int PriceListId)
        {
            try {


            List<PriceListProduct> RegisteredPriceListProduct = await ctx.PriceListProduct.Where(plp=>plp.PriceListId== PriceListId).ToListAsync();
            List<PriceListProduct> priceListProducts = mapper.Map<List<PriceListProduct>>(priceListProductDTOs);


                if (priceListProductDTOs.Count == 0)
                {

                    ctx.PriceListProduct.RemoveRange(RegisteredPriceListProduct);
                    await ctx.SaveChangesAsync();
                    return Ok();
                }

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
    }
}
