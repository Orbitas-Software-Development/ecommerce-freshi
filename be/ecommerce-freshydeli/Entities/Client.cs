namespace ecommerce_freshydeli.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Identifier { get; set; }

        public string? Email { get; set; }

        public string? Direction { get; set; }

        public string? Phone { get; set; }


        public Person Person { get; set; }

        public int? PersonId {  get; set; }  

        public int CompanyId { get; set; }
        public Company Company { get; set; }

        public DateTime CreatedDate { get; set; }=DateTime.Now;


        public Boolean Active { get; set; } = true;

        public Boolean LatePayment { get; set; } = false;
    }
}
