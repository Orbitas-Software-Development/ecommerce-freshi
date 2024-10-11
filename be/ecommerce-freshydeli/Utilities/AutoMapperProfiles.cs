using AutoMapper;
using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using Microsoft.AspNetCore.Identity;

namespace ecommerce_freshydeli.Utilities
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDTO, ApplicationUser>();
            CreateMap<ApplicationUser, RegisterDTO>();

            CreateMap<ApplicationUser, ApplicationUserDTO>().ForMember(dest => dest.Branch, src => src.MapFrom(s => s.Branch));


            CreateMap<User, ApplicationUserDTO>().ForMember(dest => dest.UserName, src => src.MapFrom(s => s.Login)).ForMember(dest => dest.FullName, src => src.MapFrom(s => s.FirstName)).ForMember(dest => dest.Branch, src => src.MapFrom(s => s.Branch)).ReverseMap();

            CreateMap<User, RegisterDTO>().ForMember(dest => dest.UserName, src => src.MapFrom(s => s.Login)).ForMember(dest => dest.FullName, src => src.MapFrom(s => s.FirstName)).ReverseMap();

            CreateMap<ApplicationUserDTO, ApplicationUser>();


            CreateMap<OrderDTO, Order>();

            CreateMap<OrderDetailsDTO, OrderDetails>();

            CreateMap<ClientDTO, Client>().ReverseMap();


            CreateMap<BranchDTO, Branch>().ReverseMap();



            CreateMap<BranchDTO, DboBranch>().ForMember(dest => dest.PosX, src => src.MapFrom(s => s.Latitude)).ForMember(dest => dest.PosY, src => src.MapFrom(s => s.Longitude)).ForMember(dest => dest.Phone, src => src.MapFrom(s => s.PhoneNumber)).ForMember(dest => dest.Client, src => src.MapFrom(s => s.ClientDTO)).ReverseMap();


          //  CreateMap<DboBranch, BranchDTO>().ForMember(dest => dest.Latitude, src => src.MapFrom(s => s.PosX)).ForMember(dest => dest.Longitude, src => src.MapFrom(s => s.PosY)).ForMember(dest => dest.PhoneNumber, src => src.MapFrom(s => s.Phone));


            CreateMap<ClientPriceListDTO, ClientPriceList>().ReverseMap();


            //para guardar o editar los productos
            CreateMap<ProductDTO, Product>().ReverseMap();

            CreateMap<ProductDTO, PriceListProduct>().ReverseMap();

            CreateMap<PriceListProductDTO, PriceListProduct>().ReverseMap();

            CreateMap<EmailReport, EmailDTO>().ReverseMap();



            CreateMap<EmailReport, EmailDTO>().ReverseMap();

        }


    }
}
