import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Input() public btnText!: string;
  public momentForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl(''),
    });
  }

  get title(): FormControl {
    return this.momentForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.momentForm.get('description') as FormControl;
  }

  get image(): FormControl {
    return this.momentForm.get('image') as FormControl;
  }

  submit(): void {
    if (this.momentForm.invalid) {
      return;
    }

    console.log('submit');
  }
}
