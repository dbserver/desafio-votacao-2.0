import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PollService } from 'src/app/services/poll/poll.service';
import { UserPermission } from 'src/app/utils/enum/user.enum';
import { UserAuth } from 'src/app/utils/interface/auth.interface';
import { Poll, PollComplete } from 'src/app/utils/interface/poll.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {
  polls: PollComplete[] = []
  page = -1
  viewMore = true
  currentUser: UserAuth | null = null 

  isAdmin = false

  constructor(
    private pollService: PollService,
    private authService: AuthService
  ) {

  }

  async ngOnInit() {
    const currentUser = this.authService.getCurrentUser()
    this.isAdmin = currentUser?.permission === UserPermission.ADMIN
    await this.getPolls()
  }

  async getPolls() {
    this.page++

    await this.pollService.getPolls(this.page).then(result => {
      this.viewMore = result.length === 10
      result.forEach(v => {

        const option = v.pollsOptionsUsers?.length ? v.pollsOptionsUsers[0].pollOption?.option : ''

        this.polls.push({
          ...v,
          expired: moment(v.expiresAt).isBefore(moment().utc(true)),
          option
        })
      })
    })
  }

  setClassBnt(poll: PollComplete, typeBnt: boolean) {
    const classDefault = typeBnt === true ? 'btn btn-primary' : 'btn btn-danger'

    if (poll.expired && !poll.pollsOptionsUsers?.length) return 'btn btn-secondary disabled'
    else if (!poll.expired && !poll.pollsOptionsUsers?.length) return classDefault
    else if (typeBnt == (poll.option == '1')) return classDefault + ' disabled'
    else return 'btn btn-secondary' + ' disabled'
  }

  async resetPoll(id: number, response?: boolean) {
    const index = this.polls.findIndex(v => v.id === id)

    this.polls[index] = {
      ...this.polls[index],
      expired: moment(this.polls[index].expiresAt).isBefore(moment().utc(true)),
    }
  }

  async responsePolls(poll: PollComplete, response: boolean) {
    const pollOption = poll.pollsOptions?.find(value => (value.option === '1') === response)
    if (!pollOption) return
    await this.pollService.createPollOptionUser(poll.id, pollOption?.id).then(async v => {
      if (v) {
        poll.pollsOptionsUsers = [v] 
        poll.option = response ? '1' : '0'
        await Swal.fire({
          text: 'Voto realizado!',
          title: 'LOGIN',
          icon: 'success',
          heightAuto: false
        })
      }
    }).catch(async err => {
      if (err && err instanceof HttpErrorResponse) {
        let text = ''

        switch (err.error.code) {
          case "POL68702":
            this.resetPoll(poll.id)
            text = "Votação expirada!"
            break
          case "POL68703":
            text = "Você já respondeu essa votação!"
            break
          default:
            text = 'Error não esperado!'
            break
        }

        await Swal.fire({
          text: text,
          title: 'LOGIN',
          icon: 'error',
          heightAuto: false
        })
      }
    })
  }
}
