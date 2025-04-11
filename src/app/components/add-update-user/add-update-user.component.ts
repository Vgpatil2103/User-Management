import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

  userForm!: FormGroup;
  editMode = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['User', Validators.required],
    });

    this.userId = +this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.editMode = true;
      const user = this.userService.getUserById(this.userId);
      if (user) this.userForm.patchValue(user);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid){
      const userData: User = {
        ...this.userForm.value,
        id: this.editMode ? this.userId : Date.now(),
      };
  
      this.editMode
        ? this.userService.updateUser(userData)
        : this.userService.addUser(userData);
  
      this.router.navigate(['/user-list']);
    }else{
      alert("Pleas fill all the mandatory field")
      this.userForm.markAllAsTouched()
    }

  
  }

}
