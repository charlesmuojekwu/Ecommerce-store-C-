import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../models/brands';
import { Iproduct } from '../models/product';
import { IType } from '../models/productTypes';
import { shopParams } from '../models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static: true}) searchTerm : ElementRef;
  products:Iproduct[];
  brands:IBrand[];
  types:IType[];
  shopParams = new shopParams();
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price : High to Low', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.allBrands();
    this.allProducts();
    this.allTypes();
  }

  allProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    },error => {
      console.log(error);
    });
  }

  allBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'},...response];
    },error => {
      console.log(error);
    });
  }

  allTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'},...response];
    },error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.allProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.allProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.allProducts();
  }

  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.allProducts();
    }
    
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.allProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new shopParams();
    this.allProducts();
  }

}
