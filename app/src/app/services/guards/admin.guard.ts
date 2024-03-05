import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserPermission } from 'src/app/utils/enum/user.enum';

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const currentUser = authService.getCurrentUser()
  if (currentUser?.permission === UserPermission.ADMIN) return true

  await router.navigate(['poll'])
  return false
}
