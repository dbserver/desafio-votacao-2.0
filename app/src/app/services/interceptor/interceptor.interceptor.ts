import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable, Injector } from "@angular/core"
import { Router } from "@angular/router"
import { from, lastValueFrom, tap } from "rxjs"
import Swal from "sweetalert2"
import { AuthService } from "../auth/auth.service"

@Injectable()
export class InterceptorHandler implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return from(this.handle(req, next))
    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {
        const authService = this.injector.get(AuthService)
        const router = this.injector.get(Router)

        const token = await authService.getTokenJwtCookie()
        const dupReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        })

        return await lastValueFrom(next.handle(dupReq).pipe(
            tap(
                event => event instanceof HttpResponse ? 'succeeded' : '',
                async error => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.error.code === 'ATH78701' || error.error.code === 'ATH78702') {
                            await Swal.fire({
                                text: 'Login expirado!',
                                title: 'LOGIN',
                                icon: 'error',
                                heightAuto: false
                            }).then(async v => {
                                await router.navigate(['login'])
                            })
                        }
                    }
                })
        ))
    }
}