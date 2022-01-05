using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BasketItemDto
    {
        [Required]
        public int Id {get; set;}

        [Required]
        public string ProductName {get; set;}

        [Required]
        [Range(0.10, double.MaxValue,  ErrorMessage ="price must be greater than Zero")]
        public decimal Price {get; set;}

        [Required]
        [Range(1,double.MaxValue , ErrorMessage ="Quantity must be more than 1 ")]
        public int Quantity {get; set;}

        [Required]
        public string PictureUrl {get; set;}

        [Required]
        public string Brand {get; set;}

        [Required]
        public string Type {get; set;}

    }       
}