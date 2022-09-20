import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../interfaces/usersinterface';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserClass } from '../class/user';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // MATERIAL ELEMENTS ***************

  displayedColumns = ['id', 'firstName', 'lastName', 'dni', 'affiliateType', 'startDate', 'actions'];

  public dataSource = new MatTableDataSource<any[]>();

  selects = [
    { affiliateType: 'GOLD', value: 'GOLD' },
    { affiliateType: 'PLATINUM', value: 'PLATINUM' },
    { affiliateType: 'BLACK', value: 'BLACK' }
  ];

  // MATERIAL ELEMENTS ***************

  private OnDestroy$ = new Subject();

  listFiltered: any[] = [''];

  searchUser$ = new Subject<string>();

  test: number | undefined;

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: 0,
    affiliateType: '',
    startDate: '',
    phoneNumber: '',
    emailAdress: ''
  }

  f: FormControl | undefined;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getUsers();
    this.filterList();

  }


  hasNumber(myString: any) {
    return /\d/.test(myString);
  }

  filterList() {

    this.searchUser$.pipe(
      debounceTime(400), distinctUntilChanged()).subscribe(term => {
      console.log(term)
      this.dataSource.data = this.listFiltered
        .filter(item => item.firstName.toLowerCase().indexOf(term.toLowerCase()) >= 0 ||
          item.lastName.toLowerCase().indexOf(term.toLowerCase()) >= 0);

        if (this.hasNumber(term) == true) {
          this.dataSource.data = this.listFiltered
            .filter(item => item.dni.toString().toLowerCase().indexOf(term.toLowerCase()) >= 0);
        }
    });
  };

  getUsers() {
    this.dataService.getUsers().subscribe(res => {
      this.dataSource.data = res;
      this.listFiltered = res;
    });

  }

  selectUser(user: User) {
    console.log(user.startDate);
    let userSelected = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dni: user.dni,
      affiliateType: user.affiliateType,
      startDate: user.startDate,
      phoneNumber: user.phoneNumber,
      emailAdress: user.emailAdress
    }
    this.test = user.dni;
    this.user = userSelected;
  }

  createUser(f: { value: UserClass; }) {
    console.log(f.value.startDate);

    let date = new Date();
    let currentDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    console.log(currentDate);
    f.value.startDate = currentDate;

    this.dataService.createContact(f.value).subscribe((result) => {
      console.log(result);
      this.getUsers();
    });
  }

  deleteUser(id: number) {
    this.dataService.deleteContact(id).subscribe((result) => {
      console.log(result);
      this.getUsers();
    });
  }

  updateUser(f: any) {
    f.value.id = this.user['id'];
    this.dataService.updateContact(f.value).subscribe((result) => {
      console.log(result);
      this.getUsers();
    });
  }


  ngOnDestroy(): void {
    this.OnDestroy$.next;
  }


}
