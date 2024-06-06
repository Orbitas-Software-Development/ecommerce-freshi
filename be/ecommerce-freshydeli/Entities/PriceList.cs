namespace ecommerce_freshydeli.Entities
{
    public class PriceList
    {
    public int Id { get; set; }    
    public string Name { get; set; }
    public string Description { get; set; }
    public int CurrencyId { get; set; } = 1;

    public Currency? Currency { get; set; }

    public int? CompanyId { get; set; }  
    public Company? Company { get; set; }

    
    }

}
