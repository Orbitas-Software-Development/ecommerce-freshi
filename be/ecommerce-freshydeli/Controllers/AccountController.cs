using AutoMapper;
using Azure;
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
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerDto)
        {

            try
            {
                // var registeredEmail = await userManager.FindByEmailAsync( registerDto.Email);
                // var registeredUser = await userManager.FindByNameAsync(registerDto.UserName);

                //Nota: Implemetar esto en el FE es mejor, se obtienen todos los usuario y se valida en tiempo real
                var registeredEmail = await ctx.Users.Where(u => u.Email == registerDto.Email).FirstOrDefaultAsync();
                var registeredUser = await ctx.Users.Where(u => u.Login == registerDto.UserName).FirstOrDefaultAsync();


                if (registeredUser != null || registeredEmail != null)
                {
                    return BadRequest(new { registeredEmail?.Email, userName= registeredUser?.Login });
                }

                User user = mapper.Map<User>(registerDto);

                // var resultado = await userManager.CreateAsync(user, registerDto.Password);


                await ctx.Users.AddAsync(user);

                await ctx.SaveChangesAsync();



                EmailServices.SendUserRegistered(new { fullName = user.FirstName, user = user.Login, email = user.Email, password = user.Login, Action = "create" });

                return Ok(new { registered = true, user, token = "Por definir", expiration = "Por definir" });

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

        }
        [HttpPost("/login")]
        public async Task<IActionResult> login(LoginDTO loginDTO)
        {


            //validar si el usuario es administrador
            var adminUser = await ctx.AdminUser.Where(u => u.Username == loginDTO.userName && u.Password==loginDTO.password).FirstOrDefaultAsync();

            if (adminUser != null)
            {

                //  User user = await ctx.Users.Where(u => u.Password == loginDTO.password).Where(u => u.Login == loginDTO.userName).Where(u => u.AspNetUser == null).Where(u => u.CompanyId == loginDTO.companyId).Include(u => u.Company).FirstOrDefaultAsync();

                User adminUserConfirmed = await ctx.Users.Where(u => u.Password == loginDTO.password).Where(u => u.Login == loginDTO.userName).Where(u => u.AspNetUser == null).Where(u => u.CompanyId == adminUser.CompanyId).Include(u => u.Company).FirstOrDefaultAsync();

                if (adminUserConfirmed != null)
                {

                    CustomTheme customThemeAdmin = await ctx.CustomTheme.Where(ct => ct.CompanyId == adminUserConfirmed.CompanyId).FirstOrDefaultAsync();

                    return Ok(new { auth = true, user = adminUserConfirmed,CustomTheme= customThemeAdmin,role = "admin" });
                }

            }

            User clientUser = await ctx.Users.Where(u => u.Password == loginDTO.password).Where(u => u.Login == loginDTO.userName).Include(u => u.Company).Include(u => u.Branch).ThenInclude(b => b.Client).FirstOrDefaultAsync();

            ApplicationUserDTO userDTOs = mapper.Map<ApplicationUserDTO>(clientUser);

           
            
            FeaturestManagement featurestManagement = await ctx.FeaturestManagement.Where(fm => fm.CompanyId == clientUser.CompanyId).FirstOrDefaultAsync();

            userDTOs.FeaturestManagement= featurestManagement;

           

        


            //Usuarios desactivos

            if (clientUser != null && clientUser.Active == false)
            {
                return NotFound();
            }

            //Login

            if (clientUser.Branch.Client.isClient == false || clientUser.Branch.isClient == false || clientUser.isClient == false)
            {
                return NotFound();
            }
            CustomTheme customTheme = await ctx.CustomTheme.Where(ct => ct.CompanyId == clientUser.CompanyId).FirstOrDefaultAsync();

            return Ok(new { auth = true, token = "no definido", CustomTheme = customTheme, user = userDTOs, Expiration = "no definido", role = "client" });

            /*  var response = await buildToken(loginDTO);

              if (response.User.Branch.Client.isClient ==false || response.User.Branch.isClient == false || response.User.isClient==false)
              {
                  return NotFound();
              }


              return Ok(new { auth = true, token = response.Token, user = response.User, Expiration = response.Expiration, role = "client" });


          return NotFound(new { auth = false, message = resultado });*/
        }

       /* private async Task<AuthenticationResponseDTO> buildToken(LoginDTO loginDTO)
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


        }*/

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


                List<User> users = await ctx.Users.AsNoTracking().Where(u => u.CompanyId == CompanyId && u.Active == true).Include(u => u.Branch).ThenInclude(b => b.Client).ToListAsync();
                List<ApplicationUserDTO> userDTOs = mapper.Map<List<ApplicationUserDTO>>(users);
                return Ok(userDTOs);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex });
            }

        }
        [HttpGet("/getUserByClientId/{ClientId}")]
        public async Task<IActionResult> getUserByClientId(int ClientId)
        {

            List<User> users = await ctx.Users.Where(u => u.Branch.Client.Id == ClientId).OrderByDescending(o => o.CreationDate
            ).ToListAsync();

            List<ApplicationUserDTO> userDTOs = mapper.Map<List<ApplicationUserDTO>>(users);

            return Ok(userDTOs);


        }

        [HttpPost("updateUser")]
        public async Task<IActionResult> updateUser([FromBody] UpdateUserDTO updateUserDTO)
        {
            try
            {
                //ApplicationUser user = await userManager.FindByIdAsync(updateUserDTO.Id);
                User ossUser = await ctx.Users.Where(os => os.Id == updateUserDTO.Id).Include(u => u.Company).FirstOrDefaultAsync();
                if (ossUser == null)
                {
                    return NotFound();
                }
              //  user.PasswordHash = userManager.PasswordHasher.HashPassword(user, updateUserDTO.Password);
                ossUser.Password = updateUserDTO.Password;
                ossUser.EmailConfirmed = true;
                EmailServices.SendUserRegistered(new { email = ossUser.Email, fullName = ossUser.FirstName, user = ossUser.Login, password = ossUser.Login, Action = "update" });
               // await userManager.UpdateAsync(user);

                ctx.Users.Update(ossUser);
                await ctx.SaveChangesAsync();
                return Ok(new { update = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, update = false });
            }

        }


        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDTO updateUserDTO)
        {
            try
            {
                //ApplicationUser user = await userManager.FindByIdAsync(updateUserDTO.Id);
                User ossUser = await ctx.Users.Where(os => os.Id == updateUserDTO.Id).Include(u => u.Company).FirstOrDefaultAsync();
                if (ossUser == null)
                {
                    return NotFound();
                }
                ossUser.BranchId = (int)updateUserDTO.BranchId;
                ossUser.Email = updateUserDTO.Email;
                ossUser.Login = updateUserDTO.UserName;
                ossUser.FirstName = updateUserDTO.FullName;
                ossUser.PersonalIdentification = updateUserDTO.PersonalIdentification;
                ossUser.JobtTitle = updateUserDTO.JobtTitle;
                ossUser.Direction = updateUserDTO.Direction;
                ctx.Users.Update(ossUser);
                await ctx.SaveChangesAsync();
                return Ok(ossUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, update = false });
            }

        }


        [HttpDelete("/deleteUser/{userId}/{companyId}")]
        public async Task<IActionResult> DeleteUser(int userId, string companyId)
        {
            try
            {
                User ossUser = await ctx.Users.Where(os => os.Id == userId).FirstOrDefaultAsync();
                if (ossUser == null)
                {
                    return NotFound();
                }

                List<Order> orders = await ctx.Order.Where(u => u.UserId == userId).ToListAsync();

                if (orders.Count == 0)
                {

                   ctx.Users.Remove(ossUser);
                   await ctx.SaveChangesAsync();


                    List<User> users = await ctx.Users.Where(u => u.Branch.Client.Company.Id == Int32.Parse(companyId)).Where(u => u.Active == true).Include(u => u.Branch).ThenInclude(b => b.Client).OrderByDescending(o => o.CreationDate).ToListAsync();
                 
                    
                    return Ok(users);

                }
                //solo se deshabilita
                ossUser.Active = false;

                ctx.Users.Update(ossUser);
                await ctx.SaveChangesAsync();

                List<User> userss = await ctx.Users.Where(u => u.Branch.Client.Company.Id == Int32.Parse(companyId)).Where(u => u.Active == true).Include(u => u.Branch).ThenInclude(b => b.Client).OrderByDescending(o => o.CreationDate).ToListAsync();

                return Ok(userss);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, update = false });
            }

        }

    }
}
