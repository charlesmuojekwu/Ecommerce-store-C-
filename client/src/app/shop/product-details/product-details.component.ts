import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: Iproduct;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
     private breadCrumb: BreadcrumbService) { 
      this.breadCrumb.set('@productDetails',' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.breadCrumb.set('@productDetails',product.name);
    }, error => {
      console.error();     
    });
  }

}
