import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('IMPLEMENTING INTERCEPTOR.');

            const headers =
                // tslint:disable-next-line:max-line-length
                request.headers.set('Authorization', 'Basic Zm1zOmh1bWFuc0AyMDIy');
            const clone = request.clone({
                headers
            });
            return next.handle(clone);

    }
}

