import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeltaOperation } from 'quill';
import { lastValueFrom } from 'rxjs';
import { Poll, PollDto, PollOptionUser } from 'src/app/utils/interface/poll.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(
    private http: HttpClient,
  ) { }

  async postPoll(dto: PollDto) {
    return await lastValueFrom(this.http
      .post<Poll>(`${environment.api}/v1/polls/`, {
        user: dto
      }))
  }

  async getPolls(page = 0, category?: string) {
    const querySkip = `?page=${page}`
    const queryCategory = category  ? `&category=${category}` : '' 

    return await lastValueFrom(this.http
      .get<Poll[]>(`${environment.api}/v1/polls${querySkip}${queryCategory}`))
  }

  async getPoll(id: number) {
    return await lastValueFrom(this.http
      .get<Poll>(`${environment.api}/v1/polls/${id}`))
  }


  async createPollOptionUser(pollId: number, optionsId: number) {
    return await lastValueFrom(this.http
      .post<PollOptionUser>(`${environment.api}/v1/polls/${pollId}/options/${optionsId}`, {}))
  }

  async createPoll(dto: {
    text: string
    expiresAt?: Date,
    ops: DeltaOperation[],
    category: string
  }) {
    return await lastValueFrom(this.http
      .post<Poll>(`${environment.api}/v1/polls/`, {
        poll: {
          ...dto
        }
      }))
  }
}
