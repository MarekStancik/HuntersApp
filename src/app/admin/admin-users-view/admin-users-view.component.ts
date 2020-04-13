import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/users/shared/user-model';
import { UserService } from 'src/app/users/shared/user.service';

@Component({
  selector: 'app-admin-users-view',
  templateUrl: './admin-users-view.component.html',
  styleUrls: ['./admin-users-view.component.scss']
})
export class AdminUsersViewComponent implements OnInit {

  selectedRow : UserModel;

  dataSource: UserModel[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.readAll()
      .subscribe(data => this.dataSource = data);
  }

  getRecord(row: UserModel){
    this.selectedRow = row;
  }

  displayedColumns: string[] = [
    'email','name', 'rules'
  ];

  getRules(row: UserModel): string{
    return row.roles.admin ? 'admin' : 'polovník';
  }
}
