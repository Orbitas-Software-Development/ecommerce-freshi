using ecommerce_freshydeli.Entities;

namespace ecommerce_freshydeli.DTOs
{
    public class OrderDTO
    {
    
        public int BranchId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Status { get; set; } = "Pending";
        public string BrokenId { get; set; } = null!;
        public DateTime DateTime { get; set; } = DateTime.Now;
        public double Total { get; set; }
        public double TotalIva { get; set; }
        public List<OrderDetailsDTO> orderDetails { get; set; }
        public string SignatureBase64 { get; set; }
        public int CurrencyId { get; set; }

        public int CompanyId { get; set; }
    }
}
