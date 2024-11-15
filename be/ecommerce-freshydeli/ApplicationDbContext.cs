using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli
{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)

        {
           //para que no de problemas el FrameworkEntity con Identity
            base.OnModelCreating(modelBuilder);
           //Esquema de base de datos por defecto
            modelBuilder.HasDefaultSchema("oss-ecommerce");

            /* Cambiar esquema por anotacion --> colocar en la entidad
            [Table("blogs", Schema = "blogging")]
            public class Blog
            {
            public int BlogId { get; set; }
            public string Url { get; set; }
            }*/

    
        }
        public DbSet<Client>Client { get; set; }
        public DbSet<Branch> Branch { get; set; }

        public DbSet<Product> Product { get; set; }

    

        public DbSet<Order> Order { get; set; }

        public DbSet<OrderDetails> OrderDetails { get; set; }

        public DbSet<Company> Company { get; set; }

        public DbSet<User> Users { get; set; }
        
        public DbSet<Iva> Iva { get; set; }
        public DbSet<Category> Category { get; set; }

        public DbSet<PriceList> PriceList { get; set; }

        public DbSet<PriceListProduct> PriceListProduct { get; set; }

        public DbSet<ClientPriceList> ClientPriceList { get; set; }
        public DbSet<Currency> Currency { get; set; }

        public DbSet<CompanyInformation> CompanyInformation { get; set; }


        public DbSet<Person> Person { get; set; }
        public DbSet<Report> Report { get; set; }
        public DbSet<EmailReport> EmailReport { get; set; }

     


        public DbSet<FeaturestManagement> FeaturestManagement { get; set; }

        public DbSet<CustomTheme> CustomTheme { get; set; }

        public DbSet<AdminUser> AdminUser { get; set; }

        public DbSet<OrderStatus> OrderStatus { get; set; }


        public DbSet<OssRoles> DboRoles { get; set; }
        public DbSet<DboBranch> DboBranch { get; set; }
    }
}
// Scaffold-DbContext "Server=orbitas.database.windows.net;Database=oss;User=denilsonvr;Password=fCr9z2Z2g5mNLriC4QGT;Encrypt=False" Microsoft.EntityFrameworkCore.SqlServer -OutputDir scaffold -t roles
