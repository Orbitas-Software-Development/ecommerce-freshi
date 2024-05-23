using System.Diagnostics.CodeAnalysis;

namespace ecommerce_freshydeli.Entities
{
    public class OrderDetails
    {
            public int Id { get; set; } 

            public int orderId { get; set; }

             public Order order { get; set; }
        
            public int? ProductId { get; set; }

            public Product Product { get; set; }

            public int Boxes { get; set; }

            public int Units { get; set; }

           public double UnitPrice { get; set; }
            
           public double Total { get; set; }
           
           public double? TotalIva { get; set; }

           public double IVA { get; set; }


    }
}
