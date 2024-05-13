namespace ecommerce_freshydeli.Entities
{
    public class EmailReport
    {
        public int Id { get; set; }

        public string? email { get; set; }

        public int? ReportId { get; set; }

        public  Report? Report { get; set; }
    }
}
