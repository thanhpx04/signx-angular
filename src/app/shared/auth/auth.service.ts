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
    }
}