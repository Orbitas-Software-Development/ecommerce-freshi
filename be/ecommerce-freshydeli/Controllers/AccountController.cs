using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using ecommerce_freshydeli.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.Design;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace ecommerce_freshydeli.Controllers
{

    [ApiController]
    [Route("api/cuentas")]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext ctx;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMapper mapper, IConfiguration configuration, ApplicationDbContext ctx)
        {

            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.configuration = configuration;
            this.ctx = ctx;

        }
        [HttpPost("/register")]
        public async Task<IActionResult> register(RegisterDTO registerDto)
        {
            var user = mapper.Map<ApplicationUser>(registerDto);
            var resultado = await userManager.CreateAsync(user, registerDto.Password);

            if (resultado.Succeeded)
            {

                EmailServices.SendUserRegistered(new { fullName = user.FullName, user = user.UserName, password = user.UserName, Action = "create" });

                return Ok(new { registered = true, user, token = "Por definir", expiratio = "Por definir" });

            }



            return BadRequest(new { registered = false, message = resultado.Errors });

        }
        [HttpPost("/login")]
        public async Task<IActionResult> login(LoginDTO loginDTO)
        {



            User user = await ctx.Users.Where(u => u.Password == loginDTO.password).Where(u => u.Login == loginDTO.userName).Include(u => u.Company).FirstOrDefaultAsync();
            if (user != null)
            {

                return Ok(new { auth = true, user, role = "admin" });
            }

            var resultado = await signInManager.PasswordSignInAsync(loginDTO.userName, loginDTO.password, isPersistent: false, lockoutOnFailure: false);

            if (resultado.Succeeded)
            {

                var response = await buildToken(loginDTO);

                return Ok(new { auth = true, token = response.Token, user = response.User, Expiration = response.Expiration, role = "client" });
            }

            return BadRequest(new { auth = false, message = resultado });
        }

        private async Task<AuthenticationResponseDTO> buildToken(LoginDTO loginDTO)
        {
            ApplicationUser user = await userManager.FindByNameAsync(loginDTO.userName);

            ApplicationUserDTO userDTO = mapper.Map<ApplicationUserDTO>(user);

            userDTO.Branch = await ctx.Branch.Where(branch => branch.Id == userDTO.BranchId).Include(b => b.Client).ThenInclude(c => c.Company).SingleAsync();

            var claims = new List<Claim>()
            {
                new Claim("userName",loginDTO.userName),
                new Claim("password",loginDTO.password)
            };
            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyJwt"]));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddHours(24);

            var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion, signingCredentials: creds);

            return new AuthenticationResponseDTO()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                Expiration = expiracion,
                User = userDTO
            };


        }

        [HttpPost("/getUser")]
        public async Task<IActionResult> getUser(LoginDTO loginDTO)
        {

            var resultado = await ctx.Users.Where(u => u.Id == 1).Include(ctx => ctx.Company).SingleOrDefaultAsync();

            return Ok(resultado);


        }
        [HttpGet("/getUserByCompanyId/{CompanyId}")]
        public async Task<IActionResult> getUserByCompanyId(int CompanyId)
        {
            try
            {

                List<ApplicationUser> users = await userManager.Users.Where(u => u.Branch.Client.Company.Id == CompanyId).Include(u => u.Branch).Include(u => u.Branch.Client).ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex });
            }

        }
        [HttpGet("/getUserByClientId/{ClientId}")]
        public async Task<IActionResult> getUserByClientId(int ClientId)
        {

            List<ApplicationUser> users = await userManager.Users.Where(u => u.Branch.Client.Id == ClientId).ToListAsync();

            return Ok(users);


        }

        [HttpPost("/updateUser")]
        public async Task<IActionResult> updateUser([FromBody] UpdateUserDTO updateUserDTO)
        {
            try
            {
                ApplicationUser user = await userManager.FindByIdAsync(updateUserDTO.Id);
                if (user == null)
                {
                    return NotFound();
                }
                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, updateUserDTO.Password);
                user.EmailConfirmed = true;
                EmailServices.SendUserRegistered(new { fullName = user.FullName, user = user.UserName, password = user.UserName, Action = "update" });
                await userManager.UpdateAsync(user);
                return Ok(new { update = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, update = false });
            }

        }

        /*  public void SendUserResgistered(string email, string username, string password)
          {

              MailMessage mailMessage = new MailMessage();
              mailMessage.From = new MailAddress("soporte@orbitacr.net");
              mailMessage.To.Add(new MailAddress(email));

              mailMessage.CC.Add(new MailAddress("soporte@orbitacr.net"));

              mailMessage.Subject = "Registro de usuario";
              mailMessage.Body = "usuario:" + username + " clave:" + password;
              // mailMessage.IsBodyHtml = true;
              // mailMessage.Attachments.Add(archivoAdjunto);
              SendHtmlEmail(mailMessage);

          }*/
        /*private async Task  SendHtmlEmail(MailMessage mailMessage)
        {
            CancellationTokenSource source = new CancellationTokenSource();
            using (SmtpClient client = new SmtpClient("smtp.gmail.com", 587))
            {
                client.Credentials = new System.Net.NetworkCredential("soporte@orbitacr.net", "5tqim3kTzAtkQSEkDnqQ858d");
                client.EnableSsl = true;
                client.Send(mailMessage);
            }
        }*/

        [HttpDelete("/deleteUser/{userId}/{companyId}")]
        public async Task<IActionResult> DeleteUser( string userId, string companyId)
        {
            try
            {
                ApplicationUser user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound();
                }
                
                List<Order> orders =await ctx.Order.Where(u=>u.UserId == userId).ToListAsync();

                if (orders.Count ==0 )
                {
                   
                    await userManager.DeleteAsync(user);
                    List<ApplicationUser> users = await userManager.Users.Where(u => u.Branch.Client.Company.Id == Int32.Parse(companyId)).Include(u => u.Branch).Include(u => u.Branch.Client).ToListAsync();
                    return Ok(users);
                    
                }
              
                user.Active = false;

                await userManager.UpdateAsync(user);

                List<ApplicationUser> userss = await userManager.Users.Where(u => u.Branch.Client.Company.Id == Int32.Parse(companyId)).Include(u => u.Branch).Include(u => u.Branch.Client).ToListAsync();

                return Ok(userss);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, update = false });
            }

        }
        
    }
    }
