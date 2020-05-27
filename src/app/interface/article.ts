export interface iArticle {
  _aid: number;
  _title: string;
  _desc: string;
  _date: Date;
  user: iUser;
}
export interface iComment {
  _cid: number;
  _date: Date;
  comment: string;
  user: iUser;
}
export interface iUser {
  _uid: number;
  _name: string;
}