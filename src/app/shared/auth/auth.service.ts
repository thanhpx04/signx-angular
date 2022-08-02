import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoginResponseData } from "src/app/login/login.service";
import { environment } from "src/environments/environment";

import { TokenModel } from "./token.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    tokenModel = new BehaviorSubject<TokenModel>(null);
    constructor(private http: HttpClient) { }

    handleAuthentication(token: string, refreshToken: string) {
        const tokenModel = new TokenModel(token, refreshToken);
        this.tokenModel.next(tokenModel);
        localStorage.setItem('tokenData', JSON.stringify(tokenModel));
    }

    autoLogin() {
        const tokenData: TokenModel = JSON.parse(localStorage.getItem('tokenData'));
        if (!tokenData) {
            return;
        }

        const loadedTokenModel = new TokenModel(tokenData.token, tokenData.refreshToken);
        if (loadedTokenModel.token) {
            this.tokenModel.next(loadedTokenModel);
        }
    }

    refreshToken(tokenModel: any) {
        return this.http.post<LoginResponseData>(environment.API_URL + '/api/auth/token', {
            tokenModel
        }, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }
}