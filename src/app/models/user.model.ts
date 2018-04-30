// import { Model } from 'browser-model';
import { Model } from './model';
import * as _ from 'underscore';
import * as jwt_decode from 'jwt-decode';
// interfaces
import { LoginInfo } from './../interfaces/login-info';
import { API } from './../helpers/api.helper';
import { Util } from './../helpers/util.helper';

export class User extends Model {
  apiUpdateValues: Array<string> = ['email', 'phone', 'first', 'last']; // these are the values that will be sent to the API

  id;
  first;
  last;
  auth;
  token;
  email;
  phone;
  static SCHEMA = {
    id:{type:'string', primary:true}, // this means every time you make a new object you must give it a _id
    first:{type:'string'},
    last:{type:'string'},
    email:{type:'string'},
    phone:{type:'string'},
    auth:{type:'boolean'},
    token:{type:'string'}
  };

  constructor(obj: object) {
    super(obj);
  }

  set full_name(name: string){
    if (name){
      let split = name.split(' ');
      this.first = split[0];
      if (split[1]) this.last = split[1];
    } else {
      this.first = '';
      this.last = '';
    }
  }

  get full_name(){
    let full_name = '';
    if (this.first) full_name = `${this.first}`;
    if (this.last) full_name = `${full_name} ${this.last}`;
    return full_name;
  }


  logout() {
    this.remove();
    localStorage.clear(); // remove all data in storage
    Util.route('/login');
    this.emit(['logout', 'auth'], 'logout', true);
  }

  async saveAPI(){
    return API.save(this, '/api/v1/users');
  }

  to(action) {
    return Util.route('/jobs/' + action);
  }

  parseToken(){
    return jwt_decode(this.token);
  }

  // ************************************
  // ********* STATIC METHODS ***********
  // ************************************

  static Auth(){// Grabs currently authenticated user
    let user:User = <User> this.findOne({auth:true});
    console.log(user);
    if(user){
      let parse = user.parseToken();

      let cur_time_date = new Date();
      let cur_time = cur_time_date.getTime()/1000;

      if(cur_time>=parse.exp){ // get the users token expiration time if it is up log them out
        user.logout()
        return null;
      }
    }

    return user;
  }

  static Login(info: LoginInfo){
    let user_info: any = info.user.data[0];
    user_info.auth  = true;
    user_info.token = info.token;
    console.log(user_info);
    let user = <User> User.create(user_info);
    user.emit(['login', 'auth'], 'login', true);
    return user;
  }

  static async LoginReg(data: Object){
    let res: any;
    let err;
    if (Util.getEnvObj().isApiReady) {
      [err, res] = await Util.to(Util.post('/api/v1/users/login', data));
    } else {
      [err, res] = await Util.to(Util.get('/assets/dummyData.json'));
    }
    if(err) Util.TE(err, true);

    if(!res.success) Util.TE(res.error, true);

    var login_info: LoginInfo = {
      token: res.token,
      user: res,
    };

    let user = this.Login(login_info);
    return user;
  }

  static async CreateAccount(data:Object){
    let err, res:any;
    [err, res] = await Util.to(Util.post('/api/v1/users', data));

    if(err) Util.TE(err, true);
    if(!res.success) Util.TE(res.error, true);

    var login_info: LoginInfo = {
      token: res.token,
      user: res.user,
    };

    let user = this.Login(login_info);
    return user;
  }
}
