import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginWithEmail() {
    this.authService.emailAndPasswordLogin(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    )
    .then(() => {
      this.toastr.success("success");
      this.loginForm.reset();
    });
  }

  loginWithGoogle() {
    this.authService.googleLogin();
  }

}
