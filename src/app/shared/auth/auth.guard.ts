import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';
import { TokenModel } from './token.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate() {
    const tokenData: TokenModel = JSON.parse(localStorage.getItem('tokenData'));
    const token = tokenData && tokenData.token;

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    const isRefreshSuccess = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(['/login']);
    }

    return isRefreshSuccess;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const tokenData: TokenModel | null = JSON.parse(localStorage.getItem('tokenData'));

    if (!token || !tokenData.refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: tokenData.refreshToken });

    let isRefreshSuccess: boolean;
    try {
      const response = await lastValueFrom(this.authService.refreshToken(tokenModel));
      this.authService.handleAuthentication(response.token, response.refreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
