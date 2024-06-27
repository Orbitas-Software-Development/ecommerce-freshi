using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using ecommerce_freshydeli.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    public class OrderController:ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public OrderController(ApplicationDbContext applicationDbContext, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
            this.userManager = userManager;
        }




        [HttpPost("createOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDTO orderDTO)
        {
            try { 
             Order order=mapper.Map<Order>(orderDTO);

             List<OrderDetails> orderDetail = mapper.Map<List<OrderDetails>>(orderDTO.orderDetails);

                await  applicationDbContext.AddAsync(order);

                await  applicationDbContext.SaveChangesAsync();

                foreach (var item in orderDetail)
                {
                    item.orderId = order.Id;
                }
                await applicationDbContext.AddRangeAsync(orderDetail);
                await applicationDbContext.SaveChangesAsync();

                Branch branch=await applicationDbContext.Branch.Where(b =>b.Id== order.BranchId).Include(b=>b.Client).ThenInclude(c=>c.Company).SingleOrDefaultAsync();

                ApplicationUser user = await userManager.FindByIdAsync(order.UserId);
                //Report Information
                Report report=await applicationDbContext.Report.Where(r=>r.Name== "Orden de compra").Where(r=>r.CompanyId==branch.Client.CompanyId).FirstOrDefaultAsync();
                //emails
                List<EmailReport> emails = await applicationDbContext.EmailReport.Where(er=>er.ReportId== report.Id).ToListAsync();
                //sendEmail
            //    EmailServices.SendOrder(new { orderDTO.UserName, ClientName = branch.Client.Name, BranchName = branch.Name, OrderId = order.Id, UserEmail = user.Email, ClientEmail = branch.Client.Email,ReportInfo=report,Email= emails }, orderDTO.pdfReport,emails,report);
                
                return Ok(order);

            }catch (Exception ex)
            {
                 return BadRequest(ex);
            }
        }
        [HttpPost("sendOrderReport")]
        public async Task<IActionResult> SendOrderReport([FromBody] SendOrderReportDTO SendOrderReportDTO)
        {
            try
            {
                Order order = await applicationDbContext.Order.Where(o=>o.Id== SendOrderReportDTO.OrderId).Include(o=>o.Branch).ThenInclude(b=>b.Client).FirstOrDefaultAsync();
                //salvar reporte en orden de compra

                order.PdfReport = SendOrderReportDTO.ReportBase64;

                applicationDbContext.Update(order);
                await applicationDbContext.SaveChangesAsync();
                Branch branch = order.Branch;

                ApplicationUser user = await userManager.FindByIdAsync(order.UserId);
                //Report Information
                Report report = await applicationDbContext.Report.Where(r => r.Name == "Orden de compra").Where(r => r.CompanyId == branch.Client.CompanyId).FirstOrDefaultAsync();
                //emails
                List<EmailReport> emails = await applicationDbContext.EmailReport.Where(er => er.ReportId == report.Id).ToListAsync();
               
                EmailServices.SendOrder(new { user.UserName, ClientName = branch.Client.Name, BranchName = branch.Name, OrderId = order.Id, UserEmail = user.Email, ClientEmail = branch.Client.Email, ReportInfo = report, Email = emails }, SendOrderReportDTO.ReportBase64, emails, report);
            
                return Ok();
            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

            [HttpGet("getOrderByUserId/{userId}")]
        public async Task<IActionResult> GetOrderByUser(string userId)
        {
            try { 
            List<Order> orders=await applicationDbContext.Order.Where(order=>order.UserId==userId).Include(ctx=>ctx.OrdersDetails).ThenInclude(x=>x.Product).ToListAsync();
             return Ok(orders);
            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("getOrderByBranchId/{branchId}")]
        public async Task<IActionResult> GetOrderByBranchId(int branchId)
        {
            try
            {
                List<Order> orders = await applicationDbContext.Order.Where(order => order.BranchId == branchId).Include(ctx => ctx.OrdersDetails).ThenInclude(x => x.Product).ThenInclude(p=>p.Currency).ToListAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getOrderByCompanyId/{companyId}")]
        public async Task<IActionResult> GetOrderByCompanyId(int companyId)
        {
            try
            {
                List<Order> orders = await applicationDbContext.Order.Where(o => o.Branch.Client.Company.Id == companyId).Include(ctx=>ctx.Branch).ThenInclude(ctx=>ctx.Client).Include(ctx => ctx.OrdersDetails).ThenInclude(x=>x.Product).ThenInclude(x => x.Iva).Include(ctx => ctx.OrdersDetails).ThenInclude(x => x.Product).ThenInclude(x => x.Category).ToListAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
