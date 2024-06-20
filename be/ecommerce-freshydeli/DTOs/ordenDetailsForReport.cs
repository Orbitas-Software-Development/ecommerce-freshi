namespace ecommerce_freshydeli.DTOs
{
    public class OrdenDetailsForReport
    {
        int OrderId { get; set; }
        string ClientName { get; set; }

        string BranchName { get; set; }

        DateTime? CreatedDate { get; set; }

        string CategoryName { get; set; }
        string Description { get; set; }
        string quantity { get; set; }

        string Subtotal { get; set; }

        string IVA { get; set; }

        string total { get; set; }

        string user { get; set; }

    }
}
