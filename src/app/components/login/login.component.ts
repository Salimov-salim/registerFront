import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // form = new FormGroup({
  //   username: new FormControl(null, Validators.required),
  //   password: new FormControl(null, Validators.required),
  // });
  constructor( private router: Router) { }
  // private authService: AuthService,
  ngOnInit(): void {
  }
  //
  // submitForm() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //
  //   // this.authService
  //   //   .login(this.form.get('username')?.value, this.form.get('password')?.value)
  //   //   .subscribe(() => {
  //   //     this.router.navigate(['/dashboard']);
  //   //   });
  // }

}
