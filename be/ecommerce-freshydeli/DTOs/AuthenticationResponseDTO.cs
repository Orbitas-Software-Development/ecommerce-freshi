namespace ecommerce_freshydeli.DTOs
{
    public class AuthenticationResponseDTO
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }

        public ApplicationUserDTO User { get; set; }
        
    }
}
