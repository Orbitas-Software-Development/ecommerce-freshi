﻿using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using ecommerce_freshydeli.Services;
using ecommerce_freshydeli.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

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

                //obtiene si la empresa tiene control de inventario

                FeaturestManagement featurestManagement =await applicationDbContext.FeaturestManagement.AsNoTracking().Where(fm=>fm.CompanyId==orderDTO.CompanyId && fm.Inventary==true).FirstOrDefaultAsync();

                foreach (var item in orderDetail)
                {
                    item.orderId = order.Id;

                    if (featurestManagement != null)
                    {
                        Product product=await applicationDbContext.Product.Where(p=>p.Id==item.ProductId).FirstOrDefaultAsync();
                        product.Stock = product.Stock - item.Units;
                        applicationDbContext.Product.Update(product);
                     
                    }

                }
                await applicationDbContext.AddRangeAsync(orderDetail);
                await applicationDbContext.SaveChangesAsync();





                DboBranch branch=await applicationDbContext.DboBranch.Where(b =>b.Id== order.BranchId).Include(b=>b.Client).ThenInclude(c=>c.Company).SingleOrDefaultAsync();
                User user = await applicationDbContext.Users.Where(os => os.Id == order.UserId).FirstOrDefaultAsync();

                //Report Information
                Report report=await applicationDbContext.Report.Where(r=>r.Name== "Orden de compra").Where(r=>r.CompanyId==branch.Client.CompanyId).FirstOrDefaultAsync();
                //emails
            //    List<EmailReport> emails = await applicationDbContext.EmailReport.Where(er=>er.ReportId== report.Id).ToListAsync();
                //sendEmail
        
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
                DboBranch branch = order.Branch;

              

                User user = await applicationDbContext.Users.Where(os => os.Id == order.UserId).FirstOrDefaultAsync();

                //Report Information
                Report report = await applicationDbContext.Report.Where(r => r.Name == "Orden de compra").Where(r => r.CompanyId == branch.Client.CompanyId).FirstOrDefaultAsync();
                //emails
                List<EmailReport> emails = await applicationDbContext.EmailReport.Where(er => er.ReportId == report.Id).ToListAsync();


                EmailServices.SendOrder(new {UserName= user.Login, ClientName = branch.Client.Name, BranchName = branch.Name, OrderId = order.Id, BranchEmail = branch.Email, ClientEmail = branch.Client.Email, ReportInfo = report, Email = emails }, SendOrderReportDTO.ReportBase64, emails, report);

                return Ok();
            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

            [HttpGet("getOrderByUserId/{userId}")]
        public async Task<IActionResult> GetOrderByUser(int userId)
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
                List<Order> orders = await applicationDbContext.Order.AsNoTracking().Where(order => order.BranchId == branchId).Include(ctx => ctx.OrdersDetails).ThenInclude(x => x.Product).ThenInclude(p=>p.Currency).OrderByDescending(o=>o.CreatedDate).ToListAsync();
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
                List<Order> orders = await applicationDbContext.Order.Where(o => o.Branch.Client.Company.Id == companyId).Include(ctx=>ctx.Branch).ThenInclude(ctx=>ctx.Client).Include(ctx => ctx.OrdersDetails).ThenInclude(x=>x.Product).ThenInclude(x => x.Iva).Include(ctx => ctx.OrdersDetails).ThenInclude(x => x.Product).ThenInclude(x => x.Category).OrderByDescending(o=>o.CreatedDate).ToListAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("getOrderForNotificate/{companyId}")]
        public async Task<IActionResult>GetOrderForNotificate(int companyId)
        {
            try
            {
                List<Order> orders = await applicationDbContext.Order.AsNoTracking().Where(o => o.CompanyId == companyId).OrderByDescending(o => o.CreatedDate).Include(o=>o.Branch).ThenInclude(b => b.Client).Include(ctx => ctx.OrdersDetails).ThenInclude(x => x.Product).ToListAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("ApproveOrder/{orderId}")]
        public async Task<IActionResult> ApproveOrder( int orderId)
        {
            Console.WriteLine(orderId);
            try
            {
                Order order= await applicationDbContext.Order.Where(o => o.Id == orderId).Include(o=>o.Branch).ThenInclude(b=>b.Client).FirstOrDefaultAsync();
              


                switch (order.OrderStatusId)
                {
                    //orden en estado pendiente
                    case (int)StatusEnum.Pending:
                        order.OrderStatusId =2;
                        order.Status = "Accepted";
                        break;
                    //orden en estado aceptada
                    case (int)StatusEnum.accepted:
                        order.OrderStatusId = 3;
                        order.Status = "Processed";
                        order.notificate = false;// la orden no se notifica, llegó al estado final
                        break;
                    default:
                        Console.WriteLine($"");
                        break;
                }


                applicationDbContext.Order.Update(order);

                await  applicationDbContext.SaveChangesAsync();

                DboBranch branch = order.Branch;

                EmailServices.SendOrderStatus(new {  ClientName = branch.Client.Name, BranchName = branch.Name, OrderId = order.Id, BranchEmail = branch.Email, ClientEmail = branch.Client.Email,OrderStatus=order.OrderStatusId});

                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("RejectOrder/{orderId}")]
        public async Task<IActionResult> RejectOrder(int orderId)
        {
            Console.WriteLine($"Rechazando orden {orderId}");
            try
            {
                Order order = await applicationDbContext.Order
                    .Where(o => o.Id == orderId)
                    .Include(o => o.Branch)
                        .ThenInclude(b => b.Client)
                    .FirstOrDefaultAsync();

                if (order == null)
                    return NotFound("Orden no encontrada.");

                // Solo se permite rechazar si está en estado pendiente
                if (order.OrderStatusId != (int)StatusEnum.Pending)
                    return BadRequest("Solo se pueden rechazar órdenes en estado pendiente.");

                order.OrderStatusId = 4; // Rechazada
                order.Status = "Rejected";
                order.notificate = false; // Asumo que también se aplica aquí

                applicationDbContext.Order.Update(order);
                await applicationDbContext.SaveChangesAsync();

                DboBranch branch = order.Branch;

                EmailServices.SendOrderStatus(new
                {
                    ClientName = branch.Client.Name,
                    BranchName = branch.Name,
                    OrderId = order.Id,
                    BranchEmail = branch.Email,
                    ClientEmail = branch.Client.Email,
                    OrderStatus = order.OrderStatusId
                });

                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


    }
}
