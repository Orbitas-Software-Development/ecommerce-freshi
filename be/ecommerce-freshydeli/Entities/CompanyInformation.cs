namespace ecommerce_freshydeli.Entities
{
    public class CompanyInformation
    {
        public int CompanyInformationId { get; set; }
        public Company? Company { get; set; }

        public int CompanyId { get; set; }

        public string? Provider { get; set; }

        public string? Identifier { get; set; }


        public string? Phone { get; set; }

        
        public string? Email { get; set; }

        public string? Direction { get; set; }

        public string? parameterizableText { get; set; }

        public string? LatePaymentMessage { get; set; }
        

    }
}
