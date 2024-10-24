import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  public moment!: Moment;
  public btnText: string = 'Editar Momento';

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

  public async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();

    formData.append('title', momentData.title!);
    formData.append('description', momentData.description!);

    if (momentData.image) {
      formData.append('image', momentData.image!);
    }

    await this._momentService.updateMoment(id!, formData).subscribe(() => {
      this._messageService.add('Momento atualizado com sucesso!');
      this._router.navigate(['/']);
    });
  }
}
