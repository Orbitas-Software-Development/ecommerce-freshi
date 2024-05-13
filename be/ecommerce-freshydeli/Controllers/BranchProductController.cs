using AutoMapper;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    public class BranchProductController:ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;
     
        public BranchProductController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;

        }
        /* [HttpGet("/getProductByBranch/{branchId}")]
         public async Task<IActionResult> getProductByBranch( int branchId)
         {
             try { 
             List<BranchProductCatalog> branchProduct= await applicationDbContext.BranchProductCatalog.Where(branchProduct=>branchProduct.BranchId==branchId).Include(branchProduct=>branchProduct.ProductCatalog).ToListAsync();
                 return Ok(new { products = branchProduct });
             }catch (Exception ex)
             {
               return  BadRequest(ex.Message);
             }


         }
         [HttpGet("/getAllProductByBranch")]
         public async Task<IActionResult> getAllProduct()
         {
             try
             {
                 List<BranchProductCatalog> branchProduct = await applicationDbContext.BranchProductCatalog.Include(branchProduct => branchProduct.ProductCatalog).ToListAsync();
                 return Ok(new { products = branchProduct });
             }
             catch (Exception ex)
             {
                 return BadRequest(ex.Message);
             }


         }*/
    }
}
