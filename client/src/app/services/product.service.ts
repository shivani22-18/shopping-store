import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAllProductUrl = 'http://localhost:3000/api/products'
  constructor(private http: HttpClient,
    private router: Router,
    private userService : UserService) { }

  

    // getProductModelServe(): Observable<any> {
    //   return this.http.get("http://localhost:3000/api/products")
      
    // }

    getAllProducts(params){

      let query = new URLSearchParams();


        if (params['category']) {
          query.append('category', params['category'])
        }

        if (params['min']) {
          query.append('min', params['min'])
        }

        if (params['max']) {
          query.append('max', params['max'])
        }
        console.log(query.toString());
        
      return this.http.get(`${this.getAllProductUrl}?${query.toString()}` ,
        {
          headers : {
            'authorization' : this.userService.getToken()
          }
        })
        .pipe(
          map((result: {count: number, products: Product[]})=>{
            return result.products
          })
        )
    }


     // get producy by ID
  getProductById(id: string) {
    return this.http.get(`${this.getAllProductUrl}/${id}`,
    {
      headers : {
        'authorization' : this.userService.getToken()
      }
    })
      .pipe(
        map((result) => {
          return <Product>result
        })
      )

  }

  // saveing product
  // get producy by ID
  saveProduct(data : FormData) {
   
    return this.http.post(this.getAllProductUrl, data)
      .pipe(
        map((result : {message : string , product : Product}) => {
          return <Product>result.product
        })
      )

  }


  // update 
  updateProduct(data , id) {

    
    return this.http.patch(this.getAllProductUrl + '/' + id, data)
  }

}


