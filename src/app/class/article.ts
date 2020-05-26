export class Article {
  private _aid: number;
  private _title: string;
  private _desc: string;
  protected user: User;
  protected comments: Comment[];
  constructor(user: User) {
    this.user = user;
    this.comments = [];
  }
  get aid(): number {
    return this._aid;
  }
  set aid(value: number) {
    this._aid = value;
  }
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }
  get desc(): string {
    return this._desc;
  }
  set desc(value: string) {
    this._desc = value;
  }
  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }
}

export class Comment {
  private _aid: number;
  protected user: User;
  private _comment: string;
  constructor(user: User) {
    this.user = user;
  }
  get aid(): number {
    return this._aid;
  }
  set aid(value: number) {
    this._aid = value;
  }
  get comment(): string {
    return this._comment;
  }
  set comment(value: string) {
    this._comment = value;
  }
  deserialize() {
    return Object.assign({}, this);
  }
}

export class User {
  private _uid: number;
  private _name: string;

  constructor(_uid: number, _name: string) {
    this._uid = _uid;
    this._name = _name;
  }

  get uid(): number {
    return this._uid;
  }
  set uid(value: number) {
    this._uid = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  deserialize() {
    return Object.assign({}, this);
  }
}