namespace ecommerce_freshydeli.Entities
{
    public class PriceList
    {
    public int PriceListId { get; set; }    
    public string Name { get; set; }
    public string Description { get; set; }

    public int? CompanyId { get; set; }  
    public Company? Company { get; set; }

    
    }

}
