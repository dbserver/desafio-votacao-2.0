import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {

  constructor(
    private authService : AuthService,
    private router: Router
  ) {  }

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
