﻿using ecommerce_freshydeli.Entities;

namespace ecommerce_freshydeli.DTOs
{
    public class OrderDetailsDTO
    {


        public int ProductId { get; set; }


        public int Boxes { get; set; }

        public int Units { get; set; }


        public double UnitPrice { get; set; }

        public double Total { get; set; }

        public double TotalIva { get; set; }

        public double ?IVA { get; set; }

 

    }
}
