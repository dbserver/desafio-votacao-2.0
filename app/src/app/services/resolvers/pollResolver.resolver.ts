import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, Router
} from '@angular/router';
import { PollService } from '../poll/poll.service';
import { Poll } from 'src/app/utils/interface/poll.interface';

@Injectable({
  providedIn: 'root'
})
export class PollResolver implements Resolve<Poll | false> {
  constructor(
    private pollService: PollService,
    private  router: Router
  ) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = parseInt(route.params['pollId'])
    const poll = await this.pollService.getPoll(id)

    if(!poll) {
      await this.router.navigate(['poll'])
      return false
    } 
    
    return poll
  }
}
