using System.ComponentModel.DataAnnotations.Schema;

namespace ecommerce_freshydeli.Entities
{

    [Table("Users", Schema = "dbo")]
    public partial class User
    {
        public int Id { get; set; }

        public int? CompanyId { get; set; }

        public int? RoleId { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Login { get; set; }

        public string? Password { get; set; }

        public string? Email { get; set; }

        public bool? State { get; set; }

        public int? ActivationKey { get; set; }

        public DateTime? ActivationDate { get; set; }

        public string? ProfilePicture { get; set; }

        public DateTime CreationDate { get; set; }

        public string? PhoneNumber { get; set; }

        public string? ChatBotCode { get; set; }

        public string? DeviceToken { get; set; }

        public string? AspNetUser { get; set; }//-->borrar
        public int? DepartmentId { get; set; }

        public virtual Company? Company { get; set; }

        //datos agregados 
        public string? PersonalIdentification { get; set; }
        public string? JobtTitle { get; set; }
        public string? Direction { get; set; }
        public int? BranchId { get; set; }
        public DboBranch? Branch { get; set; }
        public Boolean Active { get; set; } = true;
        public Boolean isClient { get; set; } = true;

        public Boolean EmailConfirmed { get; set; } = false;

    }

}
