import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';

import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

import { environment } from 'src/environments/environment';

import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment.service';
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

  public commentForm!: FormGroup;

  constructor(
    private _momentService: MomentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessagesService,
    private _commentService: CommentService
  ) {}

  public get text() {
    return this.commentForm.get('text')!;
  }

  public get username() {
    return this.commentForm.get('username')!;
  }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this._momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  public async removeHandler(id: number) {
    await this._momentService.removeMoment(id).subscribe(() => {
      this._messageService.add('Momento removido com sucesso!');
      this._router.navigate(['/']);
    });
  }

  public async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.id = this.moment!.id;

    await this._commentService.createComment(data).subscribe({
      next: (comment) => {
        this.moment!.comments!.push(comment.data);
        this._messageService.add('Comentário adicionado com sucesso!');
        formDirective.resetForm();
        this.commentForm.reset();
      },
      error: (error) => {
        this._messageService.add('Erro ao adicionar comentário!' + error.error.message);
        console.log(error.error.message);
      },
    });
  }
}
