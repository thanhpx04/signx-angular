export class User {
  constructor(
    public email: string,
    private _token: string
    // private _tokenExpirationDate: Date
  ) {}

  get token() {
    // not exist or expire
    // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //   return null;
    // }
    return this._token;
  }
}
