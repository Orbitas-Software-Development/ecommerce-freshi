namespace ecommerce_freshydeli.Entities
{
    public class EmailReport
    {
        public int Id { get; set; }

        public string?Email { get; set; }

        public int? ReportId { get; set; }

        public  Report? Report { get; set; }
    }
}
