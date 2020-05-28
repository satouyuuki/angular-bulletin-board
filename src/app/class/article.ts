export class Article {
  private _aid: number;
  private _title: string;
  private _desc: string;
  private _date: number;
  protected user: User;
  constructor(user: User) {
    this.user = user;
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
  get date(): number {
    return this._date;
  }
  set date(value: number) {
    this._date = value;
  }
  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }
}

export class Comment {
  private _cid: number;
  private _date: number;
  private _comment: string;
  protected user: User;
  public edit_flag: boolean = false;
  constructor(user: User) {
    this.user = user;
  }
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
  get date(): number {
    return this._date;
  }
  set date(value: number) {
    this._date = value;
  }
  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }
}

export class Session {
  public login: boolean;
  public user;

  constructor() {
    this.login = false;
    this.user = new User();
  }
  reset(): Session {
    this.login = false;
    this.user = new User();
    return this;
  }
}

export class Password {
  public name: string;
  public email: string;
  public password: string;
  public password_confirmation: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.password_confirmation = '';
  }
  reset(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.password_confirmation = '';
  }
}

export class User {
  public uid: string;
  public name: string;

  constructor(uid?: string, name?: string) {
    this.uid =  (uid) ? uid : '';
    this.name =  (name) ? name : '';
  }
  deserialize() {
    return Object.assign({}, this);
  }
}