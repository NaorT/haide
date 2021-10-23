import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form?: FormGroup;
  signInFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.authService.register({email: 't@t.com', password: '12345678'})
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  signInWithGoogle() {
    // TBD
  }

  signIn() {
    if (!this.form?.valid) {
      this.form?.markAllAsTouched();
      return;
    }
    this.authService.signIn(this.form.value).subscribe((res) => {
      this.router.navigate(['auth', 'register'])
    }, (err) => {
      this.signInFailed = true;
    })
  }

}
