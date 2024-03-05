import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService)
  const userService = inject(UserService)
  const router = inject(Router)

  const token = await authService.getTokenJwtCookie()

  if (token) {
    return await userService.getCurrentUser().then(user => {
      authService.setCurrentUser(user)
      return true
    }).catch(async () => {
      return false
    })
  } else {
    await router.navigate(['login'])
    return false
  }

}
