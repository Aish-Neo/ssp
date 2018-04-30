// import { Model } from 'browser-model';
import { Model } from './model';
import { User } from './user.model';
import * as _ from 'underscore';
import { API } from './../helpers/api.helper';
import { Util } from './../helpers/util.helper';

export class JobsModel extends Model {
  apiUpdateValues: Array<string> = ['id']; // these are the values that will be sent to the API
  id;
  name;
  constructor(obj: object){
    super(obj);
  }
  to(action){
    return Util.route('/jobs/' + action + '/' + this.id);
  }
  async saveAPI(){
    return API.save(this, '/v1/jobs/' + this.id);
  }
  async removeAPI(){
    return API.remove(this, '/v1/jobs/' + this.id);
  }
  //Static
  static to(action){
    return Util.route('/jobs/' + action);
  }

  static async getAllJobsList() {
    let err, res;
    if (Util.getEnvObj().isApiReady) {
      [err, res] = await Util.to(Util.get('/api/v1/jobs'));
    } else {
      [err, res] = await Util.to(Util.get('/assets/dummyDataJobList.json'));
    }

    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
    return res.data;
  }

  static resCreate(res_jobs){ // create jobs instance from a jobs response
    let jobs = this.findById(res_jobs.id);
    if(jobs) return jobs;
    let jobs_info = res_jobs;
    jobs_info.id = res_jobs.id;

    jobs_info.users = res_jobs.users;

    jobs = this.create(jobs_info);
    return jobs;
  }

  static async CreateAPI(jobsInfo:any){
    let err, res;
    [err, res] = await Util.to(Util.post('/v1/jobs', jobsInfo));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
    let jobs = this.resCreate(res.jobs);
    jobs.emit(['newly-created'], jobsInfo, true);
    return jobs;
  }

  static async getById(id:string){
    let jobs = this.findById(id);
    if(jobs) return jobs;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/v1/jobs/'+id));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let jobs_info = res.jobs;
    jobs = this.resCreate(res.jobs);
    return jobs;
  }

}
