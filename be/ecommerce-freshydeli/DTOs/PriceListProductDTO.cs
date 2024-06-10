using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.DTOs
{
    public class PriceListProductDTO
    {
     
        public int ProductId { get; set; }
        [Precision(18, 2)]
        public decimal Price { get; set; }
        public int PriceListId { get; set; }
    }
}
