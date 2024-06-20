using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{

    [ApiController]
    [Route("api/report")]
    public class ReportController: ControllerBase
    {
      readonly  ApplicationDbContext ctx;
        private readonly IMapper mapper;

        public ReportController(ApplicationDbContext ctx,IMapper mapper)
        {
            this.ctx = ctx;
            this.mapper = mapper;
        }

 
        [HttpGet("getReport/{idCompany}/{reportName}")]
        public async Task<IActionResult> GetReport(int idCompany,string reportName)
        {
            try {
               Report report = await  ctx.Report.Where(r=>r.CompanyId==idCompany).Where(r=>r.Name==reportName).FirstOrDefaultAsync();

               List<EmailReport> emails = await ctx.EmailReport.Where(e => e.ReportId == (report==null?0: report.Id)).ToListAsync();
                
                return Ok(new { report,emails });
            }
            catch (Exception ex) { 
            return BadRequest(ex.Message);  
            }
           
        }

        [HttpPut("saveReport/")]
        public async Task<IActionResult> SaveReport([FromBody] ReportEmailDTO reportEmailDTO)
        {
            try
            {
                ctx.Report.Update(reportEmailDTO.Report);
                await  ctx.SaveChangesAsync();

                List<EmailReport> emailReports =await ctx.EmailReport.Where(e => e.ReportId == reportEmailDTO.Report.Id).ToListAsync();
                ctx.EmailReport.RemoveRange(emailReports);
                await ctx.SaveChangesAsync();

                List<EmailReport> EmailReport = mapper.Map<List<EmailReport>>(reportEmailDTO.Emails);
                ctx.EmailReport.AddRange(EmailReport);
                await ctx.SaveChangesAsync();
                
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
