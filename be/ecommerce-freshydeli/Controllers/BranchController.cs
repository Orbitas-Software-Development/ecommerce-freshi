using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/branch")]
    public class BranchController : ControllerBase

    {
        private readonly ApplicationDbContext ctx;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public BranchController(ApplicationDbContext ctx, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            this.ctx = ctx;
            this.mapper = mapper;
            this.userManager = userManager;
         
        }



        [HttpGet("/testDboBranch")]
        public async Task<ActionResult> TestDboBranch()
        {
            try
            {
              List<DboBranch> branches = await ctx.DboBranch.ToListAsync();


                List<BranchDTO> branchDTOs = mapper.Map<List<BranchDTO>>(branches);

                List<CustomTheme> customTheme = await ctx.CustomTheme.Where(ct => ct.CompanyId == 38).ToListAsync();



                return Ok(customTheme);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("/getBranchByClient/{Id}")]
        public async Task<ActionResult> GetClientByCompanyId(int Id)
        {
            try
            {
                List<DboBranch> branches = await ctx.DboBranch.Where(c => c.Client.Company.Id == Id).Where(c => c.Active == true).Include(c => c.Client).OrderByDescending(o => o.CreationDate).ToListAsync();


                List<BranchDTO> branchDTOs = mapper.Map<List<BranchDTO>>(branches);

                return Ok(branchDTOs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("/deleteBranchById/{Id}")]
        public async Task<ActionResult> DeleteBranchById(int Id)
        {
            try
            {

                DboBranch branch = await ctx.DboBranch.Where(c => c.Id == Id).SingleOrDefaultAsync();
                if (branch == null) { return NotFound(); }

                List<Order> orders = await ctx.Order.Where(plp => plp.BranchId == Id).ToListAsync();
                List<ApplicationUser> users = await userManager.Users.Where(u => u.BranchId == Id).ToListAsync();

                if (orders.Count == 0)
                {
                    ctx.Remove(branch);
                    await ctx.SaveChangesAsync();
                    foreach (ApplicationUser user in users)
                    {
                       await userManager.DeleteAsync(user);
                    }
                    return Ok();
                }


              
                List<ApplicationUser> newUsers = users.Select(b => { b.Active = false; return b; }).ToList();

                foreach (ApplicationUser user in newUsers)
                {
                    await userManager.UpdateAsync(user);
                }
                branch.Active = false;
                ctx.DboBranch.Update(branch);
                await ctx.SaveChangesAsync();
                    //ctx.Client.Remove(client); --> hay que hacer una validaci[on que no tenga nada relacionado

                   // List<DboBranch> branches = await ctx.DboBranch.Where(c => c.Client.Company.Id == Id).Where(c => c.Active == true).Include(c => c.Client).ToListAsync();

                return Ok(branch);
               
               

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("createBranch")]
        public async Task<ActionResult> createBranch([FromBody] BranchDTO branchDTO)
        {
            try
            {

                DboBranch branch = mapper.Map<DboBranch>(branchDTO);

              if(branch == null) { return BadRequest(); }

                await ctx.AddAsync(branch);
                await ctx.SaveChangesAsync();

                /*
                
                BranchPriceListDTO branchPriceListDTO = new BranchPriceListDTO();

                branchPriceListDTO.
                
                = Int32.Parse(branchDTO.
                
                
                
                );

                branchPriceListDTO.BranchId = branch.Id;

                BranchPriceList branchPriceList = mapper.Map<BranchPriceList>(branchPriceListDTO);

               



                await ctx.AddAsync(branchPriceList);

                await ctx.SaveChangesAsync(); */

                return (Ok(branch));

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);

            }


        }

        [HttpPut("updateBranch")]
        public async Task<ActionResult> UpdateClient([FromBody] BranchDTO branchDTO)
        {
            try
            {
                DboBranch branch= mapper.Map<DboBranch>(branchDTO);


                ctx.Update(branch);
             

                await ctx.SaveChangesAsync();

                return Ok(branch);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }
}
