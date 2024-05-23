namespace ecommerce_freshydeli.Entities
{
    public class Order
    {
        public int Id { get; set; } 
        public int BranchId { get; set; }

        public Branch Branch { get; set; }

        public string UserId { get; set; }

        public string Status { get; set; }

        public string? BrokenId{ get; set; } = null! ;
 
        public double? Total { get; set; }
        public double? TotalIVA { get; set; }
        public ICollection<OrderDetails> OrdersDetails { get; set; }= new List<OrderDetails>();

        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string SignatureBase64 { get; set; }
    }
}
