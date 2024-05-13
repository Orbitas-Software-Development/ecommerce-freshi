using ecommerce_freshydeli.Entities;

namespace ecommerce_freshydeli.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public string Code { get; set; }

        public string Base64Image { get; set; }

        public int UnitsPerBox { get; set; }

        public double UnitWeight { get; set; }

        public int CompanyId { get; set; }

        public int CategoryId { get; set; }

        public int IvaId { get; set; }

        public int CurrencyId { get; set; } = 1;


        public int pricce { get; set; } 

        public int priceListId { get; set; } = 1;
    }
}
