using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
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

        public BranchController(ApplicationDbContext ctx, IMapper mapper)
        {
            this.ctx = ctx;
            this.mapper = mapper;
        }

        [HttpGet("/getBranchByClient/{Id}")]
        public async Task<ActionResult> GetClientByCompanyId(int Id)
        {
            try
            {
                List<Branch> branches = await ctx.Branch.Where(c => c.Client.Company.Id == Id).Where(c => c.Active == true).Include(c => c.Client).ToListAsync();
                return Ok(branches);
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

                Branch branch = await ctx.Branch.Where(c => c.Id == Id).SingleOrDefaultAsync();
                if (branch != null)
                {
                    branch.Active = false;
                    ctx.Update(branch);
                    await ctx.SaveChangesAsync();
                    //ctx.Client.Remove(client); --> hay que hacer una validaci[on que no tenga nada relacionado

                   // List<Branch> branches = await ctx.Branch.Where(c => c.Client.Company.Id == Id).Where(c => c.Active == true).Include(c => c.Client).ToListAsync();

                    return Ok(branch);
                }
                else
                {
                    return BadRequest(new { message = "El usuario no existe" });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("/createBranch")]
        public async Task<ActionResult> createBranch([FromBody] BranchDTO branchDTO)
        {
            try
            {

                Branch branch = mapper.Map<Branch>(branchDTO);

              

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
    }
}
