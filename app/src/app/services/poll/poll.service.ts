import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  async getPolls(page = 0) {
    const querySkip = `?page=${page}`  
    
    return await lastValueFrom(this.http
      .get<Poll[]>(`${environment.api}/v1/polls${querySkip}`))
  }

  async createPollOptionUser(pollId: number, optionsId: number) {
    return await lastValueFrom(this.http
      .post<PollOptionUser>(`${environment.api}/v1/polls/${pollId}/options/${optionsId}`, {}))
  }
}
