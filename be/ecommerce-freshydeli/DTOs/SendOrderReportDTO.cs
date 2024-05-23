using System.Security.Cryptography.X509Certificates;

namespace ecommerce_freshydeli.DTOs
{
    public class SendOrderReportDTO
    {
        public int OrderId { get; set; }

        public String ReportBase64 { get; set; }
    }
}
