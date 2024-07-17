using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/client")]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDbContext ctx;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public ClientController(ApplicationDbContext applicationDbContext, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            this.ctx = applicationDbContext;
            this.mapper = mapper;
            this.userManager = userManager;
        }


        [HttpGet("/getClientByCompanyId/{Id}")]
        public async Task<ActionResult> GetClientByCompanyId(int Id)
        {
            try
            {
                List<Client> clients = await ctx.Client.Where(c => c.CompanyId == Id).Where(c => c.Active == true).Include(c => c.Company).Include(c=>c.Person).OrderByDescending(o=>o.CreatedDate).ToListAsync();
                List<ClientDTO> clientsDTOs= mapper.Map<List<ClientDTO>>(clients);


                List<ClientPriceList> clientPriceLists = await ctx.ClientPriceList.Include(cp=>cp.PriceList).ToListAsync();

                foreach (var clientsDTO in clientsDTOs)
                {
                    ClientPriceList foundList =  clientPriceLists.Find(PriceList => PriceList.ClientId == clientsDTO.Id);
                    if (foundList !=null) {   clientsDTO.PriceListId = foundList.PriceListId;
                    clientsDTO.PriceListName = foundList.PriceList.Name;
                    }

                }


                return Ok(clientsDTOs);
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

                List<Order> orders=await ctx.Order.Include(o=>o.Branch).ThenInclude(b=>b.Client).ToListAsync();//todas las ordenes

                var orderByClient= orders.Find(o => o.Branch.Client.Id == Id);//ordenes relacionadas al cliente

          

                if (orderByClient == null)//si el cliente no tiene nada relacionado se borra
                {
                    List<ClientPriceList> clientPriceList = await ctx.ClientPriceList.Where(cp => cp.ClientId == Id).ToListAsync();//listas relacionas al cliente
                    ctx.RemoveRange(clientPriceList);// SE BORRAN SINO TIENE NADA RELACIONADO

                    List<Branch> branches = await ctx.Branch.Where(b => b.Client.Id == Id).ToListAsync(); //todas las sucursales asociadas
                    ctx.Branch.RemoveRange(branches);                  
                    ctx.Client.Remove(client);

                    List<ApplicationUser> users = await userManager.Users.Where(u => u.Branch.Client.Company.Id == Id).ToListAsync();
                    foreach (ApplicationUser user in users)
                    {
                       await userManager.DeleteAsync(user);
                    }


                    await ctx.SaveChangesAsync();
                    List<Client> clients = await ctx.Client.Where(c => c.CompanyId == client.CompanyId).Where(c => c.Active == true).ToListAsync(); // todos los clientes
                    return Ok(clients);
                }

                if (orderByClient != null)//si el cliente tiene orden de compras relacionadas no se borran se desactiva
                {
                   
                    
                    List<Branch> branches = await ctx.Branch.Where(b => b.Client.Id == Id).ToListAsync();
                    List<Branch> newBranches=branches.Select(b => { b.Active = false; return b; }).ToList();
            
                    List<ApplicationUser> users = await userManager.Users.Where(u => u.Branch.Client.Id == Id).ToListAsync();
                    List<ApplicationUser> newUsers =  users.Select(b => { b.Active = false; return b; }).ToList();

                    foreach(ApplicationUser user in newUsers)
                    {
                        await userManager.UpdateAsync(user);
                    }

                  
                    client.Active = false;
                    ctx.UpdateRange(newBranches);
                    ctx.Update(client);
                    await ctx.SaveChangesAsync();
                    List<Client> clients = await ctx.Client.Where(c => c.CompanyId == client.CompanyId).Where(c => c.Active == true).ToListAsync();//todos los clientes
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
                clientPriceListDTO.PriceListId = (int)clientDTO.PriceListId;
              
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

        [HttpPut("updateClient")]
        public async Task<ActionResult> UpdateClient([FromBody] ClientDTO clientDTO)
        {
            try
            {
                Client client = mapper.Map<Client>(clientDTO);
                
                ClientPriceList clientPriceList = await ctx.ClientPriceList.Where(cp => cp.ClientId == clientDTO.Id).FirstOrDefaultAsync();

                clientPriceList.PriceListId = clientDTO.PriceListId;


                ctx.Update(client);
                ctx.Update(clientPriceList);

                await ctx.SaveChangesAsync();
                
                return Ok(client);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }
}
