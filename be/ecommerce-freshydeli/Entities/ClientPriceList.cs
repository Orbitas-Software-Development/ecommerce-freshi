namespace ecommerce_freshydeli.Entities
{
    public class ClientPriceList
    {
        public int Id { get; set; }

        public int  PriceListId { get; set; }   

        public PriceList PriceList { get; set; }

        public int ClientId { get; set; }   

        public Client Client { get; set; }
    }
}
