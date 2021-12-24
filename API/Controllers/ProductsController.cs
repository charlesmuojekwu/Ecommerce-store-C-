using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.DTOs;
using AutoMapper;
using API.Errors;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandsRepo;
        private readonly IGenericRepository<ProductType> _productsTypesRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,IGenericRepository<ProductBrand> productBrandsRepo
        ,IGenericRepository<ProductType> productsTypesRepo,IMapper mapper)
        {
            _productsTypesRepo = productsTypesRepo;
            _mapper = mapper;
            _productBrandsRepo = productBrandsRepo;
            _productsRepo = productsRepo;

        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            
            var products = await _productsRepo.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);

            if(product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands(int id)
        {
            return Ok (await _productBrandsRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductTypes(int id)
        {
            return Ok (await _productsTypesRepo.ListAllAsync());
        }
    }
}