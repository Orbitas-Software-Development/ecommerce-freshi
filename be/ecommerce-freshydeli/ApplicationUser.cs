using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography.X509Certificates;

namespace ecommerce_freshydeli
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        public string PersonalIdentification { get; set; }

        public string JobtTitle { get; set; }

        public string Direction { get; set; }

        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public Boolean Active { get; set; } = true;
        public Boolean isClient { get; set; } = true;

    }
}
