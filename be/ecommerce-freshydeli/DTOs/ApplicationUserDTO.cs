using ecommerce_freshydeli.Entities;

namespace ecommerce_freshydeli.DTOs
{
    public class ApplicationUserDTO
    {
        public string FullName {  get; set; }
        public string PersonalIdentification { get; set; }
        public string JobtTitle { get; set; }
        public string Direction { get; set; }
        public int BranchId { get; set; }
        public DboBranch Branch { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public Boolean EmailConfirmed { get; set; }
        public Boolean isClient { get; set; } = true;
        public string Id { get; set; }

        public string? ProfilePicture { get; set; }

        public FeaturestManagement? FeaturestManagement { get; set; }



    }
}
