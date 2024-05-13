using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Entities
{
    public class Branch
    {
        public int Id { get; set; }
        public string Name { get; set; }


        public string PhoneNumber {get;set;}
        
        public string Direction { get;set;}

        public string Latitude { get;set;}

        public string Longitude { get;set;}

        public int ClientId { get;set;}

        public  Client Client { get;set;}

        public DateTime CreatedDate { get; set; } = DateTime.Now;


        public Boolean Active { get; set; } = true;

    }
}
