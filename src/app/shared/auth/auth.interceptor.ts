import { HttpEvent, HttpHandler, HttpInterceptor, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // this tells RxJS is that I only want to take one value from that observable and thereafter, 
        // it should automatically unsubscribe.
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${user.token}`)
                });
                return next.handle(modifiedReq);
            }));
    }
}