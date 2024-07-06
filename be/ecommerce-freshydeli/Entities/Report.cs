using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ecommerce_freshydeli.Entities
{
    public class Report
    {
        public int Id { get; set; }    

        public string Name { get; set; }

        public string Description { get; set; }

        public string Subject { get; set; }

        public string DocumentName { get; set; }

       public int  CompanyId { get; set; }

       public Company? Company { get; set; }

      
    }
   
}
