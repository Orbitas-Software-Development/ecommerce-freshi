using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController:ControllerBase
    {
        ApplicationDbContext Context;
        IMapper Mapper;
        public ProductController(ApplicationDbContext context,IMapper mapper)
        {
            this.Context = context;
            this.Mapper = mapper;
        }
        [HttpGet("getProductsByCompanyId/{companyId}")]
        public async Task<IActionResult> GetProduct(int companyId)
        {
            List<Product> product=await Context.Product.Where(p=>p.CompanyId==companyId).Include(p=>p.Currency).Include(p => p.Iva).Include(p => p.Category).ToListAsync();
            return Ok(product);
        }
        [HttpGet("getProductsByListId/{listId}")]
        public async Task<IActionResult> GetProductByListId(int listId)
        {
            List<PriceListProduct> priceListProduct = await Context.PriceListProduct.Where(p => p.PriceListId== listId).Include(p=>p.Product).ThenInclude(p=>p.Currency).Include(p=>p.Product).ThenInclude(p=>p.Category).Include(p => p.Product).ThenInclude(p => p.Iva).ToListAsync();

            List<Product> products = [];

            foreach (var item in priceListProduct)
            {
                products.Add(item.Product);
            }

            return Ok(products);
        }

        [HttpDelete("deleteProductBy/{productId}")]
        public async Task<IActionResult> DeleteProductByProductId(int productId)
        {

            Product product=await Context.Product.Where(p=>p.Id==productId).FirstOrDefaultAsync();

            int companyId = product.CompanyId;

            List<PriceListProduct> priceListProduct=await Context.PriceListProduct.Where(plp=>plp.ProductId==productId).ToListAsync();

            Context.Remove(product);

            await Context.SaveChangesAsync();

            Context.RemoveRange(priceListProduct);

            await Context.SaveChangesAsync();

            List<Product> products = await Context.Product.Where(p => p.CompanyId == companyId).Include(p => p.Currency).Include(p => p.Iva).Include(p => p.Category).ToListAsync();

            return Ok(products);
        }

        /* [HttpPut("updateProduct")]
       public async Task<IActionResult> updateProduct([FromBody] ProductDTO productDTO)
       {
        Product product=Mapper.Map<Product>(productDTO);

           Prodcu

           Context.Update(product);

           Context.SaveChangesAsync();

           Context.Update



           foreach (var item in priceListProduct)
           {
               products.Add(item.Product);
           }

           return Ok(products);
       }*/

        [HttpPost("createProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductDTO productDTO)
        {
            Product product = Mapper.Map<Product>(productDTO);

            PriceListProduct priceListProduct = Mapper.Map<PriceListProduct>(productDTO);

            await Context.AddAsync(product);

            await Context.SaveChangesAsync();

            priceListProduct.ProductId = product.Id;

            await Context.AddAsync(priceListProduct);

            await Context.SaveChangesAsync();


            return Ok(productDTO);
        }
    }
}
