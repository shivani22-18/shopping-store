// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   public cartItemList : any =[]
//   public lstproducts = new BehaviorSubject<any>([]);
//   // public search = new BehaviorSubject<string>("");
  
//   constructor() { }
//   getProducts(){
//     return this.lstproducts.asObservable();
//   }

//   // setProduct(product : any){
//   //   this.cartItemList.push(...product);
//   //   this.lstproducts.next(product);
//   // }

//   addtoCart(product : any){
//     this.cartItemList.push(product);
//     this.lstproducts.next(this.cartItemList);
//     this.getTotalPrice();
//     console.log(this.cartItemList)
//   }


//   getTotalPrice() : number{
//     let grandTotal = 0;
//     this.cartItemList.map((a:any)=>{
//       grandTotal += a.total;
//     })
//     return grandTotal;
//   }

//   removeCartItem(product: any){
//     this.cartItemList.map((a:any, index:any)=>{
//       if(product.id === a.id){
//         this.cartItemList.splice(index,1);
//       }
//     })
//     this.lstproducts.next(this.cartItemList);
//   }
//   removeAllCart(){
//     this.cartItemList = []
//     this.lstproducts.next(this.cartItemList);
//   }
// }

import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/products';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart  = {};
  private _cartObservable : BehaviorSubject<Object> ;
  constructor() { 
    if(!this.isCartExists())
      localStorage.setItem('cart' , JSON.stringify(this.cart));


    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart)
  }

  readCartDataFromLocalStorage(){
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  writeCartDataToLocalStorage(){
    localStorage.setItem('cart' , JSON.stringify(this.cart))
  }

  get cartObservable(){
    return this._cartObservable;
  }

  clearCart(){
    localStorage.removeItem('cart')
    this._cartObservable.next({})
  }

  addToCart(product : Product){
    let quantity = this.cart[product._id];
    if(quantity){
      this.cart[product._id] =  (+quantity) + 1; 
    }else{
      this.cart[product._id] = 1;
    }
    // localStorage.setItem()

    this._cartObservable.next(this.cart);
    localStorage.setItem('cart' , JSON.stringify(this.cart));
  }

  isCartExists(){
    if(localStorage.getItem('cart')){
      return true
    }else{
      return false
    }
  }

  getQuantity(product: Product){
   return this.cart[product._id] ? +this.cart[product._id] : 0 
  }

  setQuantity(product : Product , quantity : number ){
      if(quantity < 1){
        delete this.cart[product._id];
      }else{
        this.cart[product._id] = quantity
      }
      
      this.writeCartDataToLocalStorage();
      this._cartObservable.next(this.cart);
  }

}
