using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams prodspecParams)
            :base(x =>
                (string.IsNullOrEmpty(prodspecParams.Search) || x.Name.ToLower().Contains(prodspecParams.Search))&&
                (!prodspecParams.BrandId.HasValue || x.ProductBrandId == prodspecParams.BrandId) &&
                (!prodspecParams.TypeId.HasValue || x.ProductTypeId == prodspecParams.TypeId)
            )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(prodspecParams.PageSize * (prodspecParams.PageIndex -1),prodspecParams.PageSize);

            if (!string.IsNullOrEmpty(prodspecParams.Sort))
            {
                switch (prodspecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}