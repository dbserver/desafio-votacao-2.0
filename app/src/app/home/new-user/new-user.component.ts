import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserPermission } from 'src/app/utils/enum/user.enum';
import { UserDto } from 'src/app/utils/interface/user.interface';
import { validatorCpf } from 'src/app/utils/validators/regexCpf.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent {
  newUserForm: FormGroup = this.formBuilder.group({})
  maskCpf = '000.000.000-00'
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      name: ['', [Validators.minLength(2)]],
      email: ['', [Validators.minLength(8)]],
      document: ['', [Validators.required, validatorCpf()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmed: ['', [Validators.minLength(8)]]
    })
  }

  async createUser() {
    if (this.newUserForm.invalid) return

    const user: UserDto = {
      name: this.newUserForm.controls['name'].value,
      email: this.newUserForm.controls['email'].value,
      document: this.newUserForm.controls['document'].value,
      password: this.newUserForm.controls['password'].value,
      permission: UserPermission.DEFAULT
    }

    await this.userService.postUser(user).then(async v => {
      await Swal.fire({
        text: "Usuario criado com sucesso",
        title: 'Usuario',
        icon: 'success',
        heightAuto: false
      })
      this.ngOnInit()
    }).catch(async error => {
      if (error && error instanceof HttpErrorResponse) {
        let text = 'Erro não esperado!'

        if(error.error.code === 'USR84701') text = 'Este email já está em uso!'
        else if(error.error.code === 'USR84702') text = 'Este Cpf já está em uso!'

        await Swal.fire({
          text: text,
          title: 'LOGIN',
          icon: 'error',
          heightAuto: false
        })
      }
    })
  }

  validPassword() {
    const password = this.newUserForm.controls['password'].value
    const passwordConfirmed = this.newUserForm.controls['passwordConfirmed'].value

    return !(password === passwordConfirmed)
  }
}
