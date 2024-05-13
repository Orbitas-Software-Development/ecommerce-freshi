using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext ctx;

        public CategoryController(ApplicationDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet("getCategoryByCompany/{companyId}")]
        public async Task<ActionResult> GetCategoryByCompany(int companyId)
        {
            try
            {
                List<Category> categories = await ctx.Category.Where(c => c.CompanyId == companyId).ToListAsync();
                return Ok(categories);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateCategory")]
        public async Task<ActionResult> UpdateCategory([FromBody] Category Category)
        {
            try
            {
                ctx.Update(Category);

                await ctx.SaveChangesAsync();

                return Ok(Category);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("deleteCategory/{id}")]
        public async Task<ActionResult> DeleteCategoryById(int id)
        {
            try
            {
                Category category = await ctx.Category.Where(c => c.Id == id).FirstOrDefaultAsync();
              
                ctx.Remove(category);
                await ctx.SaveChangesAsync();
                List<Category> categoryList = await ctx.Category.Where(c => c.Company.Id == category.CompanyId).ToListAsync();
                return Ok(categoryList);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("createCategory")]
        public async Task<ActionResult> CreateCategory([FromBody] Category category)
        {
            try
            {
                await ctx.AddAsync(category);
                var result = await ctx.SaveChangesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
