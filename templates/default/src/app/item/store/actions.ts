import { Item } from "@app/models/item";

export class LoadAll {
  static readonly type = '[Item API] LoadAll';
}
export class LoadOne {
  static readonly type = '[Item API] LoadOne';
  constructor(public id: string) { }
}
export class CreateOne {
  static readonly type = '[Item API] CreateOne';
  constructor(public item: Item) { }
}
export class DuplicateOne {
  static readonly type = '[Item API] DuplicateOne';
  constructor(public item: Item) { }
}
export class UpdateOne {
  static readonly type = '[Item API] UpdateOne';
  constructor(public item: Item, public fieldsToUpdate: Partial<Item>) { }
}
export class RemoveOne {
  static readonly type = '[Item API] RemoveOne';
  constructor(public item: Item) { }
}