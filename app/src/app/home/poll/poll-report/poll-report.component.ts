import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import * as moment from 'moment';
import { Poll } from 'src/app/utils/interface/poll.interface';

@Component({
  selector: 'app-poll-report',
  templateUrl: './poll-report.component.html',
  styleUrls: ['./poll-report.component.sass'],
})
export class PollReportComponent implements OnInit {
  doughnutChartLabels: string[] = ['Sim', 'Não'];
  doughnutChartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = []
  doughnutChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  }

  poll: Poll | null = null

  isExpired = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    const poll: Poll = this.activatedRoute.snapshot.data["poll"]

    const yes = (poll.pollsOptions?.find(opt => opt.option === '1'))?.selectCount ?? 0
    const not = (poll.pollsOptions?.find(opt => opt.option === '0'))?.selectCount ?? 0
    this.doughnutChartDatasets.push({
      data: [!yes && !not  ? -1 : yes, !yes && !not ? -1 : not],
      backgroundColor: [
        'rgb(13, 110, 253, 0.6)',
        'rgba(220, 53 ,69, 0.6)'
      ]
    })

    this.poll = poll
    this.isExpired = moment(poll.expiresAt).isBefore(moment().utc(true))
  }

  goPoll() {
    this.router.navigate(['poll'])
  }

}
