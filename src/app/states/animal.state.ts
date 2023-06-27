import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State<string[]>({
  name: 'animals',
  defaults: []
})
@Injectable()
export class AnimalsState {}