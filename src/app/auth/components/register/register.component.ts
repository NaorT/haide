import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form?: FormGroup;
  signInFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  register() {
    if (!this.form?.valid) {
      this.form?.markAllAsTouched();
      return;
    }
    if (this.form?.value.password !== this.form?.value.rePassword) {
      return;
    }

    this.authService.register(this.form?.value).pipe(
      switchMap((registerRes) => this.authService.signIn(this.form?.value))
    ).subscribe((loginRes) => {
      console.log(loginRes);
    }, (err) => {
      console.log(err);
      this.signInFailed = true;
    })
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })

  }




}
