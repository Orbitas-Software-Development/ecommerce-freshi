using Microsoft.AspNetCore.Mvc;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/Dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;
        public DashboardController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        /*
        [HttpGet("getDashboardTotals")]
        public async Task<IActionResult> GetDashboardTotals(
            int departmentId,
            int branchId,
            int workflowId,
            int companyId,
            int userId,
            string timeZoneOffset = "-06:00") // Valor predeterminado si no se pasa desde el frontend
        {
            try
            {
                var result = await Context.DashboardTotals
                    .FromSqlInterpolated($@"
                    EXEC GetDashboardTotals 
                    @DeparmentId = {departmentId}, 
                    @BranchId = {branchId}, 
                    @WorkflowId = {workflowId}, 
                    @CompanyId = {companyId}, 
                    @UserId = {userId}
            ")
                    .AsNoTracking()
                    .ToListAsync();

                // Dado que el SP devuelve solo una fila, tomamos el primer elemento
                return Ok(result.FirstOrDefault());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }*/
    }
}
