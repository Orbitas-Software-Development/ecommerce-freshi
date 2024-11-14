using ecommerce_freshydeli.Entities;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_freshydeli.DTOs
{
    public class RegisterDTO
    {

        [Required]
        public string Email { get; set; }

        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PersonalIdentification { get; set; }
        [Required]
        public string JobtTitle { get; set; }
        [Required]
        public string Direction { get; set; }
        [Required]
        public int BranchId { get; set; }

        public Boolean isClient { get; set; } = true;

        public Boolean EmailConfirmed { get; set; } = false;


        public DateTime CreationDate { get; set; }= DateTime.Now;


        public int CompanyId { get; set; }

        public string ProfilePicture { get; set; } = "No aplica usuario freshi";

    }
}
