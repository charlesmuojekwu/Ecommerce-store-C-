import { v4 as uuidv4 } from 'uuid';


export interface IBasket {
    id: number;
    items:IBasketItem[]
}

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Basket implements IBasket {
    id = uuidv4();          /// generate unique ID 
    items: IBasketItem[] = [];
}

export interface IBasketTotals {
    shipping: number;          
    subtotal: number;
    total: number;
}

