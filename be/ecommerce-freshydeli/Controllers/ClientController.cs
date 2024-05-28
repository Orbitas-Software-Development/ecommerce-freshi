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

                

                List<Order> orders=await ctx.Order.Include(o=>o.Branch).ThenInclude(b=>b.Client).ToListAsync();

                var orderByClient= orders.Find(o => o.Branch.Client.Id == Id);


                if(orderByClient == null)
                {
                    List<Client> clients = await ctx.Client.Where(c => c.CompanyId == client.CompanyId).Where(c => c.Active == true).ToListAsync();
                    List<Branch> branches = await ctx.Branch.Where(b => b.Client.Id == Id).ToListAsync();
                    ctx.Branch.RemoveRange(branches);                  
                    ctx.Client.Remove(client);
                    await ctx.SaveChangesAsync();
                    return Ok(clients);
                }

                if (orderByClient != null)
                {
                    List<Client> clients = await ctx.Client.Where(c => c.CompanyId == client.CompanyId).Where(c => c.Active == true).ToListAsync();
                    List<Branch> branches = await ctx.Branch.Where(b => b.Client.Id == Id).ToListAsync();
                    List<Branch> newBranches=branches.Select(b => { b.Active = false; return b; }).ToList();
                    client.Active = false;
                    ctx.UpdateRange(newBranches);
                    ctx.Update(client);
                    await ctx.SaveChangesAsync();
                    //ctx.Client.Remove(client); --> hay que hacer una validaci[on que no tenga nada relacionado
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

                ClientPriceListDTO clientPriceListDTO = new ClientPriceListDTO();
                clientPriceListDTO.PriceListId = Int32.Parse(clientDTO.PriceListId);
              
                clientPriceListDTO.ClientId = client.Id;
                ClientPriceList clientPriceList = mapper.Map<ClientPriceList>(
                clientPriceListDTO);
                await ctx.AddAsync(clientPriceList);
                await ctx.SaveChangesAsync();

                return Ok(client);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("getLatePaymentByClientId/{clientId}")]
        public async Task<ActionResult> GetLatePaymentByClient(int clientId)
        {
            try
            {
               Client client = await ctx.Client.Where(c => c.Id == clientId).FirstAsync();

                return Ok(client.LatePayment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
