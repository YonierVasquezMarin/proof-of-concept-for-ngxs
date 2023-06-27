import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AddAnimal, ZooState, ZooStateModel } from '././actions/animal.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  animals$: Observable<string[]>;

  @Select(ZooState.pandas) pandas$!: Observable<string[]>;

  constructor(private store: Store) {
    this.animals$ = this.store.select(state => state.zoo.animals);
  }

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name));
  }
}
