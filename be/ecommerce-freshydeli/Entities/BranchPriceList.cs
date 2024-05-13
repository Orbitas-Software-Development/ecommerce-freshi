namespace ecommerce_freshydeli.Entities
{
    public class BranchPriceList
    {
        public int Id { get; set; }

        public int  PriceListId { get; set; }   

        public PriceList PriceList { get; set; }

        public int BranchId { get; set; }   

        public Branch Branch { get; set; }
    }
}
