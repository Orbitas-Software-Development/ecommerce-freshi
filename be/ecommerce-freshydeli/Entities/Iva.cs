namespace ecommerce_freshydeli.Entities
{
    public class Iva
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }


        public decimal Porcentage { get; set; } = 0;

        public int? CompanyId { get; set; }
        public Company? Company { get; set; }


        public Boolean Active { get; set; } = true;
    }
}
