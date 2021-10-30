import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../state/auth.service';
import * as Icon from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInFailed = false;
  googleIcon = Icon.faGoogle;
  facebookIcon = Icon.faFacebookF;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  signIn(option: 'facebook' | 'google') {
    this.authService.signIn(option);
  }
}
