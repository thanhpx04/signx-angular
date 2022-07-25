import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { User } from "./user.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    constructor() {}

    handleAuthentication(email: string, token: string) {
        const user = new User(email, token);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
        const userData: {
            email: string;
            _token: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData._token);
        if(loadedUser.token) {
            this.user.next(loadedUser);
        }
    }
}