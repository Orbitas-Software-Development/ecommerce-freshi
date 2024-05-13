using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/client")]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDbContext ctx;
        private readonly IMapper mapper;

        public ClientController(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.ctx = applicationDbContext;
            this.mapper = mapper;
        }


        [HttpGet("/getClientByCompanyId/{Id}")]
        public async Task<ActionResult> GetClientByCompanyId(int Id)
        {
            try
            {
                List<Client> clients = await ctx.Client.Where(c => c.CompanyId == Id).Where(c => c.Active == true).Include(c => c.Company).Include(c=>c.Person).ToListAsync();
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("/deleteClientById/{Id}")]
        public async Task<ActionResult> DeleteClientById(int Id)
        {
            try
            {

                Client client = await ctx.Client.Where(c => c.Id == Id).SingleOrDefaultAsync();
                if (client != null)
                {
                    client.Active = false;
                    ctx.Update(client);
                    await ctx.SaveChangesAsync();
                    //ctx.Client.Remove(client); --> hay que hacer una validaci[on que no tenga nada relacionado

                    List<Client> clients = await ctx.Client.Where(c => c.CompanyId == client.CompanyId).Where(c => c.Active == true).ToListAsync();

                    return Ok(clients);
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

        [HttpPut("/updateClients")]
        public async Task<ActionResult> UpdateClients([FromBody] List<ClientDTO> clientDTOs)
        {
            try
            {
                List<Client> clients = mapper.Map<List<Client>>(clientDTOs);
                ctx.UpdateRange(clients);
                await ctx.SaveChangesAsync();
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
        [HttpPost("/createClient")]
        public async Task<ActionResult> CreateClient([FromBody] ClientDTO clientDTO)
        {
            try
            {
                Client client = mapper.Map<Client>(clientDTO);
                await ctx.AddAsync(client);
                await ctx.SaveChangesAsync();
                return Ok(client);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("getLatePaymentByCompanyId/{CompanyId}")]
        public async Task<ActionResult> GetLatePaymentByCompanyId(int CompanyId)
        {
            try
            {
               Client client = await ctx.Client.Where(c => c.CompanyId == CompanyId).FirstAsync();

                return Ok(client.LatePayment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
