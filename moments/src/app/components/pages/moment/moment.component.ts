import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  public moment?: Moment;
  public baseApiUrl = environment.baseApiUrl;
  public faTimes = faTimes;
  public faEdit = faEdit;

  constructor(
    private _momentService: MomentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this._momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  public async removeHandler(id: number) {
    await this._momentService.removeMoment(id).subscribe(() => {
      this._messageService.add('Momento removido com sucesso!');
      this._router.navigate(['/']);
    });
  }
}
