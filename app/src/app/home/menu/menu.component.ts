import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserPermission } from 'src/app/utils/enum/user.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  isAdmin = false

  constructor(
    private authService : AuthService,
    private router: Router
  ) {  }

  async ngOnInit () {
    const currentUser = this.authService.getCurrentUser()
    this.isAdmin = currentUser?.permission === UserPermission.ADMIN
  }

  async logout(){
    await Swal.fire({
      text: 'Você realmente deseja sair?',
      title: 'LOGOUT',
      icon: 'question',
      heightAuto: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(v => {
      if(v.isConfirmed) {
        this.authService.logout()
        this.router.navigate(['login'])
      }
    })   
  }
}
