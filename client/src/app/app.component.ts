import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { Ipagination } from './models/pagination';
import { Iproduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Store';


  constructor(private basketService: BasketService, private accountService: AccountService)
  { }

  ngOnInit(): void {
    this.loadBasket(),
    this.loadCurrentUser()
  }

  /// to persit current user login
  loadCurrentUser() {
    const token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loaded User');
      }, error => {
        console.log(error);
      })
  }

  /// to persist users cart Item
  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialized basket')
      }, error => {
        console.log(error);
      });
    }
  }

}


  
