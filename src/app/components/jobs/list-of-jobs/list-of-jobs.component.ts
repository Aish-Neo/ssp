import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {JobsModel} from "../../../models/jobs.model";
import {User} from "../../../models/user.model";
import {JobsList} from "../../../interfaces/jobs-list";

@Component({
  selector: 'ssp-list-of-jobs',
  templateUrl: './list-of-jobs.component.html',
  styleUrls: ['./list-of-jobs.component.css']
})
export class ListOfJobsComponent implements OnInit, AfterViewInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  @ViewChild(MatSort) sort = MatSort;
  selectedValue: string;
  jobs: Array<JobsModel> = [];
  user:User;
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  async ngOnInit() {
    this.jobs = await JobsModel.getAllJobsList();
    this.user = User.Auth();
    const ELEMENT_DATA: JobsList[] = this.jobs;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA[0]['resultSet']);
  }
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }
}

