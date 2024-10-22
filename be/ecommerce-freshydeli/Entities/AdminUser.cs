namespace ecommerce_freshydeli.Entities
{
    public class AdminUser
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }

        public int CompanyId { get; set; }
    }
}
