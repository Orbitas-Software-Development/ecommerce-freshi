using System.ComponentModel.DataAnnotations;

namespace ecommerce_freshydeli.DTOs
{
    public class UpdateUserDTO
    {
        public string? Id { get; set; }

        public string? Password { get; set; }
        public string? Email { get; set; }

        public string? UserName { get; set; }


  
        public string? FullName { get; set; }
        
        public string? PersonalIdentification { get; set; }
       
        public string? JobtTitle { get; set; }
       
        public string? Direction { get; set; }
       
        public int? BranchId { get; set; }

        public Boolean? isClient { get; set; } = true;

        public string? PhoneNumber { get; set; }
    

    }
}
