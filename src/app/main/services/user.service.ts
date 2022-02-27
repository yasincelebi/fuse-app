import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { User} from "../interfaces";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private users$: BehaviorSubject<Array<User>> = new BehaviorSubject(localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []);
  constructor() {

      this.users$.subscribe(users => {
          localStorage.setItem('users', JSON.stringify(users));
      });
  }

  get users(): Observable<Array<User>> {
      return this.users$.asObservable();
  }

  addUser(user: User): Observable<User[]> {
      this.users$.next([...this.users$.getValue(), user]);
      return this.users;
  }

  removeUser(user: User): void {
      this.users$.next(this.users$.getValue().filter(u => u.id !== user.id));
  }

  updateUser(user: User, userID: string): Observable<User> {
      const users = this.users$.getValue();
      const index = users.findIndex(u => u.id === userID);
      users[index] = user;
      this.users$.next(users);
      return this.users.pipe(map(users => users[index]));
  }



  getUser(id: string): Observable<User> {
      return this.users$.asObservable().pipe(
          map(users => users.find(user => user.id === id))
      );
  }





}
