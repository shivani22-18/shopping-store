// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProductService } from 'src/app/services/product.service';
// // import { ProductModelServer, ServerResponse } from 'src/app/models/products';
// import { LoginService } from 'src/app/services/login.service';
// import { CartService } from 'src/app/services/cart.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   products: [] = [];
//   public lstproducts: any[] = [];
//   username = '';


//   constructor(private _productService: ProductService,
//               private _router: Router,
//               private _loginservice:LoginService,
//               private _cartService: CartService) {

// // this._loginservice.getUserName()
// //     .subscribe(
// //                 data => this.username= data.toString(),
// //                 error => this._router.navigate(['../login'])
// //               )
// }
              
// logout(){
//     localStorage.removeItem('token');
//     this._router.navigate(['../login']);
// }  
        
//   ngOnInit(): void {
//     // this.getAllProducts();
//     // this._productService.getProductModelServe().subscribe(data => {
//     //     this.lstproducts = data;
//     //     this.lstproducts.forEach((a:any) => {
//     //     Object.assign(a,{quantity:1, total:a.price});
//     //     });
//     // });

//     // this._cartService.search.subscribe((val:any) => {
//     //   this.searchKey = val;
//     // })

//   }

//   addtoCart(p: any){
//     this._cartService.addtoCart(p);
//   }



//   // filter(category:string){
//   //   this.filterCategory = this.lstproducts
//   //   .filter((a:any)=>{
//   //     if(a.category == category || category==''){
//   //       return a;
//   //     }
//   //   })
//   // }

//   // getAllProducts(){
//   //     this._productService.getAllProducts().subscribe((response) => {
//   //       console.log('Response from API is', response);
//   //     },(error) => {
//   //       console.log('Error is', error);
//   //     })
//   // }

// }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
