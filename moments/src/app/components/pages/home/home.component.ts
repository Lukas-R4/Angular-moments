import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public allMoments: Array<Moment>; // Todos os momentos
  public moments: Array<Moment>; // Momentos filtrados pelo usuário
  public baseApiUrl = environment.baseApiUrl;
  public faSearch = faSearch;
  public searchTerm: string = '';

  constructor(private _momentService: MomentService) {
    this.allMoments = [];
    this.moments = [];
  }

  ngOnInit(): void {
    this._momentService.getAllMoments().subscribe((moments) => {
      const data = moments.data;

      data.map((moment) => {
        moment.created_at = new Date(moment.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  public search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.moments = this.allMoments.filter((moment) => {
      return moment.title?.toLowerCase().includes(value);
    });
  }
}
