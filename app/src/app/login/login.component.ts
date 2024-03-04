import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validatorCpf } from '../utils/validators/regexCpf.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  mask = '000.000.000-00'
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  loginForm: FormGroup = this.formBuilder.group({})

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      document: ['', [Validators.required, validatorCpf()]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  async validarLogin() {
    if (this.loginForm.invalid) return

    const cpf = this.loginForm.controls['document'].value
    const password = this.loginForm.controls['password'].value

    const logou = await this.authService.login(cpf, password).catch(async v => {
      if (v && v instanceof HttpErrorResponse) {
        const text  = v.error.code ? 'CPF ou Senha errada!' :  v.error.detail
        await Swal.fire({
          text: text,
          title: 'LOGIN',
          icon: 'error'
        })
      }
    })

    if (!logou) return
    // this.router.navigate(['home'])
  }

}
