import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor() {
    if (!localStorage.getItem('user_list')) {
      localStorage.setItem('user_list', JSON.stringify([]));
    }
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('user_list') || '[]');
  }

  addUser(user: User) {
    const users = this.getUsers();
    user.id = Date.now();
    users.push(user);
    localStorage.setItem('user_list', JSON.stringify(users));
  }

  updateUser(updatedUser: User) {
    const users = this.getUsers().map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem('user_list', JSON.stringify(users));
  }

  deleteUser(id: number) {
    const users = this.getUsers().filter(user => user.id !== id);
    localStorage.setItem('user_list', JSON.stringify(users));
  }

  getUserById(id: number): User | undefined {
    return this.getUsers().find(user => user.id === id);
  }
}
