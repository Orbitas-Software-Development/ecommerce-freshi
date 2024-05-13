namespace ecommerce_freshydeli.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }


        public int? CompanyId { get; set; }
        public Company? Company { get; set; }
        public Boolean Active { get; set; } = true;
    }
}
