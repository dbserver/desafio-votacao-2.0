import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ContentChange, QuillModules } from 'ngx-quill';
import { PollService } from 'src/app/services/poll/poll.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.sass']
})
export class NewPollComponent {
  formats = []
  contentChange: ContentChange | null = null

  textLen = 0
  expiresAt: Moment = moment().utc(true)

  dateInit = this.expiresAt.format('YYYY-MM-DD')
  timeInit = this.expiresAt.format('HH:mm')

  category = ''

  quillModules: QuillModules = {
    toolbar: [
      [{ size: ['small', 'medium', 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link'],
    ],
  };

  constructor(
    private pollService: PollService,
    private router: Router
  ) { }

  change(contentChange: ContentChange) {
    this.textLen = contentChange.editor.getLength() - 1
    contentChange.editor.deleteText(1000, this.textLen);
    this.contentChange = contentChange
  }

  setCategory(event: Event) {
    const target = event.target as HTMLButtonElement
    this.category = target.value
  }

  public setPublishAt(event: Event, type: number) {
    const target = event.target as HTMLButtonElement
    const time = target.value

    if (!this.expiresAt) this.expiresAt = moment()

    if (type === 1) this.expiresAt = this.expiresAt.set({
      hour: Number(time.split(':')[0]),
      minute: Number(time.split(':')[1])
    })
    else {
      this.expiresAt = moment(time).set({
        hour: this.expiresAt.hour(),
        minute: this.expiresAt.minute()
      })
    }
  }

  async goPoll() {
    await this.router.navigate(['poll'])
  }

  async save() {
    if (!this.contentChange) return

    if ( moment().utc(true).isAfter(this.expiresAt)) {
      await Swal.fire({
        text: "Data já expirada!",
        title: 'Votação',
        icon: 'error',
        heightAuto: false
      })

      return
    }    


    await this.pollService.createPoll({
      text: this.contentChange?.text ?? '',
      ops: this.contentChange?.delta.ops ?? [],
      expiresAt: this.expiresAt ? this.expiresAt.utc(true).toDate() : undefined,
      category: this.category
    }).then(async poll => {
      if (poll) {
        await Swal.fire({
          text: "Votação criado com sucesso",
          title: 'Votação',
          icon: 'success',
          heightAuto: false
        }).then(async () => {
          await this.goPoll()
        })
      }
    }).catch(async err => {
      if (err && err instanceof HttpErrorResponse) {
        const text  = err.error.code ? 'Data já expirada!' :  err.error.detail
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
