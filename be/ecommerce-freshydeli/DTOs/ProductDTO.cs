using ecommerce_freshydeli.Entities;

namespace ecommerce_freshydeli.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string Code { get; set; } = "No Aplica";

        public string Base64Image { get; set; }

        public int UnitsPerBox { get; set; } = 0;

        public double UnitWeight { get; set; } = 0;

        public int CompanyId { get; set; }

        public int CategoryId { get; set; }

        public int IvaId { get; set; }

        public int CurrencyId { get; set; } = 1;


        public int price { get; set; } 

        public int priceListId { get; set; } = 1;


        public int Stock { get; set; } = 0;

        //exclusivos de tacobell
        public string? DescriptionEn { get; set; } = "No Aplica";//--> tacobell
        public string? WasserCode { get; set; } = "No Aplica";//--> tacobell
        public string? FrankeCode { get; set; } = "No Aplica";//--> tacobell


    }
}
