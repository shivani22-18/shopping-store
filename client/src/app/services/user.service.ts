import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userSignupUrl = "http://localhost:3000/api/users/signup";
  private userLoginUrl = "http://localhost:3000/api/users/login";
  private isAdminUrl = "http://localhost:3000/api/users/is-admin";
  private getAllUserUrl = "http://localhost:3000/api/users"

  private _loginObservable : BehaviorSubject<Object>;

  constructor(private http : HttpClient) {
    this._loginObservable = new BehaviorSubject({});

   }

  public get loginObservable(){
    return this._loginObservable
  }

  private saveTokenToLocalStorage(token : string){
    localStorage.setItem('token' , "Bearer "+ token)
  }

  logout(){
    localStorage.removeItem('token')
    this._loginObservable.next({})
  }
  
  getToken(){
    return localStorage.getItem('token') ? localStorage.getItem('token') : "";
  }

  isAdmin(){
   
    let headers = new HttpHeaders({
      'authorization' : this.getToken()
    })
    return this.http.get(this.isAdminUrl, {headers}).pipe(
      map(result=>{
        return <boolean>result
      })
    )
  }

  getAll(){
    let headers = new HttpHeaders({
      'authorization': this.getToken()
    })
     return this.http.get(this.getAllUserUrl, {headers})
     .pipe(
       map((result: {users: User[]})=>{
         return result.users
       })
     )
  }

  signup(user : User){
    return this.http.post(this.userSignupUrl , user)
    .pipe(
      map(result=>{
         return <{message : string}>result
      })
    )
 }


 login(credentials : {email : string , password : string}){
  return this.http.post(this.userLoginUrl , credentials)
  .pipe(
    map((result : loginResponce)=>{
      this.saveTokenToLocalStorage(result.token)
      this._loginObservable.next({});
      return result
    })
  )
}

}

interface loginResponce{
  token : string , 
  message : string
}



