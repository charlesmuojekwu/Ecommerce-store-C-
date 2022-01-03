import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
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
quantity = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
     private breadCrumb: BreadcrumbService, private basketService: BasketService) { 
      this.breadCrumb.set('@productDetails',' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if(this.quantity > 1)
    {
      this.quantity--;
    }
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
