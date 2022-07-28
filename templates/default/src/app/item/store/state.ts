import { Injectable } from '@angular/core';
import { Item } from '@app/models/item';
import { WebApiService } from '@app/services/web-api.service';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { patch,removeItem } from '@ngxs/store/operators';
import { tap,mergeMap, concatMap } from 'rxjs';
import * as fromActions from './actions';

const STATE_TOKEN = new StateToken<any>('item')

const FRONT_PATH = "main/item";

export interface ItemStateModel {
  items: Item[];
  selected: Item|undefined;
}

@State<ItemStateModel>({
  name: STATE_TOKEN,
  defaults: {
    items: [],
    selected: undefined,
  }

})
@Injectable()
export class ItemState {
  constructor(private webApiService: WebApiService) { }

  @Selector()
  static items(state: ItemStateModel){
    return state.items;
  }

  @Selector()
  static selected(state: ItemStateModel) {
    return state.selected;
  }

  @Action(fromActions.LoadAll)
  loadAll({ setState }: StateContext<ItemStateModel>) {
    return this.webApiService.getAllItems().pipe(
      tap(rs => {
        setState(
          patch({
            items: rs
          })
        );
      })
    );
  }

  @Action(fromActions.CreateOne)
  createOne({ setState, dispatch }: StateContext<ItemStateModel>,
    { item }: fromActions.CreateOne) {
    return this.webApiService.createItem(item).pipe(
      tap(rs => {
        setState(
          patch({
            selected: rs
          })
        );
      }),
      mergeMap(() => dispatch(new Navigate([FRONT_PATH])))
    );
  }

  @Action(fromActions.LoadOne)
  loadOne({ setState }: StateContext<ItemStateModel>,
    { id }: fromActions.LoadOne) {
    return this.webApiService.getItem(id).pipe(
      tap(rs => {
        setState(
          patch({
            selected: rs
          })
        );
      })
    );
  }

  @Action(fromActions.RemoveOne)
  removeOne({ setState }: StateContext<ItemStateModel>,
    { item }: fromActions.RemoveOne) {
    return this.webApiService.deleteItem(item.id).pipe(
      tap(rs => {
        setState(
          patch<ItemStateModel>({
            items: removeItem<Item>(e => e == item),
            selected: undefined
          })
        )
      })
    );
  }

  @Action(fromActions.UpdateOne)
  updateOne({ setState, dispatch }: StateContext<ItemStateModel>,
    { item, fieldsToUpdate }: fromActions.UpdateOne) {
    let updated = { ...item, ...fieldsToUpdate };
    return this.webApiService.putItem(updated).pipe(
      tap(rs => {
        setState(
          patch({
            selected: rs
          })
        );
      }),
      mergeMap(() => dispatch(new Navigate([FRONT_PATH])))
    );
  }

  @Action(fromActions.DuplicateOne)
  duplicateOne({ setState, dispatch }: StateContext<ItemStateModel>,
    { item }: fromActions.DuplicateOne) {
    return this.webApiService.createItem(item).pipe(
      tap(rs => {
        setState(
          patch({
            selected: rs
          })
        );
      }),
      mergeMap(() => dispatch(new Navigate([FRONT_PATH])))
    );
  }
}