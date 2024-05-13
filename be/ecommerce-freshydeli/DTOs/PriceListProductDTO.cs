namespace ecommerce_freshydeli.DTOs
{
    public class PriceListProductDTO
    {
        public int PriceListId { get; set; }

        public int? ProductId { get; set; }

        public decimal Price { get; set; }
    }
}
