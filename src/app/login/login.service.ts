import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { AuthService } from "../shared/auth/auth.service";

export interface LoginResponseData {
    token?: string,
    refreshToken?: string
}

@Injectable({providedIn: 'root'})
export class LoginService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    login(username: string, password: string) {
        return this.http.post<LoginResponseData>(
            'https://thingsboard.cloud/api/auth/login',
            {
                "username": username,
                "password": password
            }
        )
        .pipe(
          catchError(this.handleError),
          tap(resData => {
            this.authService.handleAuthentication(username, resData.token);
          })
        );
    }
  
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (errorRes.error) {
            errorMessage = errorRes.error.message;
        }
        return throwError(errorMessage);
    }
}