using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Controllers
{
    [ApiController]
    [Route("api/AspNetUser")]
    public class AspNetUserController : ControllerBase
    {
        private readonly ApplicationDbContext ctx;
        public AspNetUserController(ApplicationDbContext ctx)
        {
            this.ctx = ctx;
        }
       
    }
}
