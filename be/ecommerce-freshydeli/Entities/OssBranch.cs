
using System.ComponentModel.DataAnnotations.Schema;

namespace ecommerce_freshydeli.Entities
{

    [Table("Branch", Schema = "dbo")]
    public class DboBranch
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; } = null!;

        public string? Code { get; set; }

        public bool State { get; set; }

        public DateTime CreationDate { get; set; }= DateTime.Now;

        public string? PosX { get; set; }

        public string? PosY { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public int? WorkflowId { get; set; }

        public int? DepartmentId { get; set; }

        public string? ImageUrl { get; set; }

        public string? Direction { get; set; } //-> nuevo campo para el carrito de compras

        public int? ClientId { get; set; }

        public Client? Client { get; set; }

        public Boolean Active { get; set; } = true;

        public Boolean isClient { get; set; } = true;

    }
}
