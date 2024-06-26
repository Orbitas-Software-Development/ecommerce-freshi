﻿using AutoMapper;
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
                List<Client> clients = await ctx.Client.Where(c => c.CompanyId == Id).Where(c => c.Active == true).Include(c => c.Company).Include(c=>c.Person).ToListAsync();
                List<ClientDTO> clientsDTOs= mapper.Map<List<ClientDTO>>(clients);


                List<ClientPriceList> clientPriceLists = await ctx.ClientPriceList.Include(cp=>cp.PriceList).ToListAsync();

                foreach (var clientsDTO in clientsDTOs)
                {
                    ClientPriceList foundList =  clientPriceLists.Find(PriceList => PriceList.ClientId == clientsDTO.Id);
                    clientsDTO.PriceListId = foundList.PriceListId;
                    clientsDTO.PriceListName = foundList.PriceList.Name;

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

                List<Order> orders=await ctx.Order.Include(o=>o.Branch).ThenInclude(b=>b.Client).ToListAsync();

                var orderByClient= orders.Find(o => o.Branch.Client.Id == Id);

                List<ClientPriceList> clientPriceList = await ctx.ClientPriceList.Where(cp => cp.ClientId == Id).ToListAsync();

                ctx.RemoveRange(clientPriceList);

                if (orderByClient == null)
                {
                    List<Client> clients = await ctx.Client.Where(c => c.CompanyId == client.CompanyId).Where(c => c.Active == true).ToListAsync();
                    List<Branch> branches = await ctx.Branch.Where(b => b.Client.Id == Id).ToListAsync();
                    ctx.Branch.RemoveRange(branches);                  
                    ctx.Client.Remove(client);

                    List<ApplicationUser> users = await userManager.Users.Where(u => u.Branch.Client.Company.Id == Id).ToListAsync();
                    foreach (ApplicationUser user in users)
                    {
                        userManager.DeleteAsync(user);
                    }


                    await ctx.SaveChangesAsync();
                    return Ok(clients);
                }

                if (orderByClient != null)
                {
                    List<Client> clients = await ctx.Client.Where(c => c.CompanyId == client.CompanyId).Where(c => c.Active == true).ToListAsync();
                    
                    List<Branch> branches = await ctx.Branch.Where(b => b.Client.Id == Id).ToListAsync();
                    List<Branch> newBranches=branches.Select(b => { b.Active = false; return b; }).ToList();
            
                    List<ApplicationUser> users = await userManager.Users.Where(u => u.Branch.Client.Company.Id == Id).ToListAsync();
                    List<ApplicationUser> newUsers =  users.Select(b => { b.Active = false; return b; }).ToList();

                    foreach(ApplicationUser user in newUsers)
                    {
                        userManager.UpdateAsync(user);
                    }

                  
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
