namespace ecommerce_freshydeli.DTOs
{
    public class ClientDTO
    {
        public int ?Id { get; set; }
        public string Name { get; set; }

        public string Identifier { get; set; }

        public int CompanyId { get; set; }

        public Boolean ?LatePayment { get; set; }

        public Boolean? Active { get; set; } = true;
        public Boolean? isClient { get; set; } = true;
        public string? Email { get; set; }

        public string? Direction { get; set; }

        public string? Phone { get; set; }

        public int? PersonId { get; set; }
        public int? PriceListId { get; set; }

    }
}
