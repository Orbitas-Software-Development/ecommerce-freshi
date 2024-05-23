using ecommerce_freshydeli.Entities;

namespace ecommerce_freshydeli.DTOs
{
    public class ReportEmailDTO
    {

        public Report Report { get; set; }
        public List<EmailDTO> Emails { get; set; }
    }
}
