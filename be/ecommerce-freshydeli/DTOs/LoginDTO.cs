using System.ComponentModel.DataAnnotations;

namespace ecommerce_freshydeli.DTOs
{
    public class LoginDTO
    {
        [Required]
        public string userName {  get; set; }

        [Required]
        public string password { get; set; }
        [Required]
        public int companyId { get; set; }
        public string? CompanyPin { get; set; }
    }
}
