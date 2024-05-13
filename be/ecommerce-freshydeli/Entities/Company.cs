using System.ComponentModel.DataAnnotations.Schema;

namespace ecommerce_freshydeli.Entities
{
    [Table("Company", Schema = "dbo")]
    public class Company
    {
        
            public int Id { get; set; }

            public string? Name { get; set; }

            public string? Logo { get; set; }

            public bool? State { get; set; }

            public DateTime? CreationDate { get; set; }

            public string AuthUrl { get; set; } = null!;

            public string? PrivatePin { get; set; }

            public string? BusinessName { get; set; }

            public string? IdBusinessName { get; set; }

            public string? PictureBusinessName { get; set; }

            public virtual ICollection<User> Users { get; set; } = new List<User>();
       
    }
}
