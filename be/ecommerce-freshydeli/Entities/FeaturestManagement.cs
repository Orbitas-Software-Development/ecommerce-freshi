namespace ecommerce_freshydeli.Entities
{
    public class FeaturestManagement
    {
        public int Id { get; set; } 
        public Company Company { get; set; }

        public string Name { get; set; }
        public int CompanyId { get; set; }
     
        public bool Inventary { get; set; }

    }
}
