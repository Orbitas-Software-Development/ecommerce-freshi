using System.ComponentModel.DataAnnotations.Schema;

namespace ecommerce_freshydeli.Entities
{

    [Table("CustomThemes", Schema = "dbo")]
    public class CustomTheme
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string PrimaryColorHex { get; set; } = null!;

        public string? SecondaryColorHex { get; set; }

        public string? LogoUrl { get; set; }

        public string? AuthImageUrl { get; set; }

        public string? BranchCustomName { get; set; }

        public virtual Company Company { get; set; } = null!;
    }

}
