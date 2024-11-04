using ecommerce_freshydeli.DTOs;

namespace ecommerce_freshydeli.Entities
{
    public class Order
    {
        public int Id { get; set; } 
        public int BranchId { get; set; }

        public DboBranch Branch { get; set; }

        public int UserId { get; set; }

        public OrderState OrderState { get; set; }

        public int OrderStateId { get; set; } = 1;

        public string Status { get; set; }

        public string? BrokenId{ get; set; } = null! ;
 
        public double? Total { get; set; }
        public double? TotalIVA { get; set; }
        public ICollection<OrderDetails> OrdersDetails { get; set; }= new List<OrderDetails>();

        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string SignatureBase64 { get; set; }

        public int CurrencyId { get; set; }
        public string? PdfReport { get; set; }

        public int CompanyId { get; set; }

        public bool notificate { get; set; } = true;

    }
}
