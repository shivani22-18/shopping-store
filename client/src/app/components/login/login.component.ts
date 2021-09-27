// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
// import { LoginService } from 'src/app/services/login.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserService } from 'src/app/services/user.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
 

//   public loginForm: FormGroup;
//   constructor(private _userService: UserService,
//     private _router: Router,
//     private _activatedRoute: ActivatedRoute) { 
//     this.loginForm = new FormGroup({
//       email: new FormControl(null, Validators.required),
//       password: new FormControl(null, Validators.required)
//     })

    
//   }

//   ngOnInit(): void {
    
//   }

//   isValid(controlName: string | (string | number)[]) {
//     return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
//   }



//   login(){
//     console.log(this.loginForm.value);
    
//     if(this.loginForm.valid){
//     this._userService.login(this.loginForm.value)
//     .subscribe(
//       data => {
//         console.log(data);
//         localStorage.setItem('token', data.toString());
//         this._router.navigate(['../home'])
//       },
//         error => {

//         }      
//     )
//     }
//   }

//   movetoregister() {
//     this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
//   }

  
// }


import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : HTMLFormElement
  error : string ; 
  success : string;
  returnUrl: string;
  public loginForm: FormGroup;
  
  constructor(private  userService : UserService ,
    private route : ActivatedRoute, 
    private router : Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params : ParamMap)=>{
      this.returnUrl = params.get('returnUrl')
    })
  }

  movetoregister() {
        this.router.navigate(['../register'], { relativeTo: this.route });
      }

      isValid(controlName: string | (string | number)[]) {
            return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
          }
        

  login(event : Event){
    event.preventDefault();
    this.form = <HTMLFormElement>event.target
    this.readFormValues();
  }

  navigateToHomePage(){
    let url = this.returnUrl ? this.returnUrl : '/';
    this.router.navigateByUrl(url);
  }

  readFormValues(){
    let email = (<HTMLInputElement>
                  this.form.elements.namedItem('email')).value
    let password = (<HTMLInputElement>
                    this.form.elements.namedItem('password')).value;
    
    let creadentials = {
      email , password
    }

    console.log(creadentials);
    this.userService.login(creadentials)
    .subscribe(
      {
        next : (result)=>{
          console.log(result );
          this.success = result.message
          this.error = undefined
          this.navigateToHomePage()

        } , 
        error : (responce : HttpErrorResponse)=>{
          console.log(responce.error);
          this.success = undefined
          this.error = responce.error.error.message
        }
      }
    )
    

  }
}