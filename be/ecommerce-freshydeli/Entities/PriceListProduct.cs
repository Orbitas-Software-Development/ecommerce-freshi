﻿using Microsoft.EntityFrameworkCore;

namespace ecommerce_freshydeli.Entities
{
    public class PriceListProduct
    {
        public int Id { get; set; }

        public int PriceListId { get; set; }    

        public PriceList  PriceList { get; set; }

        public int? ProductId { get; set; }  

        public Product Product { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }
    }
}
