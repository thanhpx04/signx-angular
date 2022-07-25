import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
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
            environment.API_URL + '/api/auth/login',
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