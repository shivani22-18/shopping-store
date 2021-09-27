import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NavigationStart, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // public totalItem : number = 0;
  // public Item: number = 0;
  // username = '';
  public searchTerm !: string;
  public totalItem: number = 0;
  isLoggedIn = false;
  isAdmin: boolean = false;
  isAdminUrl = false;
  numberOfItems: Number =0;

  constructor(private _cartService: CartService,
              private _userService: UserService,
              private _router: Router) {
    // this._userService.getUserName()
    // .subscribe(
    //             data => this.username= data.toString(),
    //             error => this._router.navigate(['../login'])
    //           )
    
    _router.events.subscribe({
      next: (event)=>{
        console.log(event);
        if(event instanceof NavigationStart){
          let url =(<NavigationStart>event).url
          this.isAdminUrl = url.includes('/is-admin')
        }
      }
    })
   }

  ngOnInit(): void {
    // this._cartService.getProducts().subscribe(res => {
    //   this.totalItem = res.length;
    // });
    this._cartService.cartObservable.subscribe({
      next : (cart)=> {
        console.log(cart)
        this.totalItem = Object.keys(cart).length
      }
    })


  

  // this._cartService.getProducts().subscribe(res => {
  //   this.Item = res.length;
  // })

  // search(event: any){
  //   this.searchTerm = (event.target as HTMLInputElement).value;
  //   this._cartService.search.next(this.searchTerm);
  // }

  // logoutUser(){
  //   localStorage.removeItem('token');
  // }  

  // getToken(){
  //   return localStorage.getItem('token');
  // }

  // loggedIn(){
  //   return !!localStorage.getItem('token');
  // }

  this._userService.loginObservable.subscribe(
    {
      next : ()=>{

        let token = this._userService.getToken();
        if(token!= ''){
          this.cheakAdmin()
          this.isLoggedIn = true;
        }else{
          this.isLoggedIn = false;
        }
        console.log(this.isLoggedIn);
        
      }
    }
  )
}

cheakAdmin(){
  // cheak user is admin or not 
  this._userService.isAdmin().subscribe(
    (isAdmin)=>{
      this.isAdmin = isAdmin
    }
  )
}

logout(){
  // alert('')
  this._userService.logout()
  this._router.navigate(['login'])
}


}
