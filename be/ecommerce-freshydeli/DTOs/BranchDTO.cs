namespace ecommerce_freshydeli.DTOs
{
    public class BranchDTO
    {


        public string? id { get; set; }

        public int CompanyId { get; set; }
        public string Name { get; set; }


        public string PhoneNumber { get; set; }

        public string Direction { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public int ClientId { get; set; }

        public ClientDTO? ClientDTO { get; set; }
        public string? Email { get; set; } = "No definido";

        public string? LocationUrl { get; set; }
    }
}
