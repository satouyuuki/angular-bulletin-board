export class Article {
  private _aid: number;
  private _title: string;
  private _desc: string;
  private _date: Date;
  protected user: User;
  // protected comments: Comment[];
  constructor(user: User) {
    this.user = user;
    // this.comments = [];
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
  get date(): Date {
    return this._date;
  }
  set date(value: Date) {
    this._date = value;
  }
  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }
}

export class Comment {
  private _date: Date;
  private _cid: number;
  protected user: User;
  private _comment: string;
  public edit_flag: boolean = false;
  constructor(user: User) {
    this.user = user;
  }
  // get edit_flag(): boolean {
  //   return this._edit_flag;
  // }
  // set edit_flag(value: boolean) {
  //   this._edit_flag = value;
  // }
  get cid(): number {
    return this._cid;
  }
  set cid(value: number) {
    this._cid = value;
  }
  get comment(): string {
    return this._comment;
  }
  set comment(value: string) {
    this._comment = value;
  }
  get date(): Date {
    return this._date;
  }
  set date(value: Date) {
    this._date = value;
  }
  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }
}

export class Session {
  public login: boolean;

  constructor() {
    this.login = false;
  }
  reset(): Session {
    this.login = false;
    return this;
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