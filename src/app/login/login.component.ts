import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User, UserService } from './../user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit(id: string): void {

    if ( id == "SignIn"){console.warn("signin");this.signIn();}
    else if (id == "SignUp"){console.warn("signup");this.signUp();}
    
  }

  signIn(){
    console.warn('Your order has been submitted', this.loginForm.value);
    if (this.loginForm.value.username !== null && this.loginForm.value.password !== null) {
      this.userService.tryLogin(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
        next: (data) => { this.router.navigate(['/home']) },
        error: (error) => {
          console.log('error');
          console.log(error);
        },

      });
    }
    else {
      console.warn("rempli les champs stp");
    }
  }

  signUp(){
    if (this.loginForm.value.username !== null && this.loginForm.value.password !== null) {
      this.userService.checkUserName(this.loginForm.value.username!).subscribe({
        next: (data) => {console.log(data)}
        })
    }
  }

}