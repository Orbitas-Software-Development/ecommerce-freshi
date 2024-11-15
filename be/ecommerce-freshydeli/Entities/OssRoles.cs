using System.ComponentModel.DataAnnotations.Schema;

namespace ecommerce_freshydeli.Entities
{
    [Table("Roles", Schema = "dbo")]
    public class OssRoles
    {
         
            public int Id { get; set; }

            public string? Name { get; set; }

            public bool? State { get; set; }

            public int? CompanyId { get; set; }
        

    }
}
