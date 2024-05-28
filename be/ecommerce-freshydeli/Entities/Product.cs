using System.Reflection.PortableExecutable;

namespace ecommerce_freshydeli.Entities
{
    public class Product
    {
        public int Id { get; set; }
     
        public string Description { get; set; }

        public string Code { get; set; }

        public string Base64Image { get; set; }

        public int UnitsPerBox { get; set; }

        public double UnitWeight { get; set; }

        public int  CompanyId { get; set; }
        public Company? Company { get; set; }

        public int CategoryId { get; set; }
        
        public Category? Category { get; set; }

        public  int IvaId { get; set; } 

        public Iva? Iva { get; set; }

        public int CurrencyId { get; set; } = 1;
        public Currency? Currency { get; set; }

        public DateTime DateTime { get; set; }=DateTime.Now;
  

    }
}
