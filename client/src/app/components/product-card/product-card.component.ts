import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  
  @Input('product')
  product : Product;
  quantity: number = 0;
  

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.cartObservable.subscribe({
      next : (cart)=>{
        this.quantity = this.cartService.getQuantity(this.product)
      }
    })
  }
  addToCart(){
    this.cartService.addToCart(this.product)
  }

  
}
