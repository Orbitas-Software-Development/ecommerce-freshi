using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Identity;

namespace ecommerce_freshydeli.Utilities
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDTO, ApplicationUser>();
            CreateMap<ApplicationUser, RegisterDTO>();

            CreateMap<ApplicationUser,ApplicationUserDTO>().ForMember(dest => dest.Branch, src => src.MapFrom(s => s.Branch))
;

            CreateMap<ApplicationUserDTO, ApplicationUser>();


            CreateMap<OrderDTO,Order>();

            CreateMap<OrderDetailsDTO, OrderDetails>();
          
            CreateMap<ClientDTO, Client>().ReverseMap();
            CreateMap<BranchDTO, Branch>().ReverseMap();

            CreateMap<ClientPriceListDTO, ClientPriceList>().ReverseMap();


            //para guardar o editar los productos
            CreateMap<ProductDTO, Product>().ReverseMap();

            CreateMap<ProductDTO, PriceListProduct>().ReverseMap();

            CreateMap<PriceListProductDTO, PriceListProduct>().ReverseMap();

            CreateMap<EmailReport, EmailDTO>().ReverseMap();
        }


    }
}
