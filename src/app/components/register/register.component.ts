import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
register() {
// alert('Done');
console.log(this.userRegisterForm.value)
}
get name() {
  return this.userRegisterForm.get('name');
}
get phones() {
  return this.userRegisterForm.get('phoneNums') as FormArray;
}
addNewPhone() {
  this.phones.push(new FormControl('', [Validators.pattern('')]));
}
//  deletePhone(index: number) {
//     this.phones.removeAt(index);
//   }

  deleteLastPhone() {
    this.phones.removeAt(this.phones.length - 1);
  }
  userRegisterForm:FormGroup
  constructor(){
    this.userRegisterForm = new FormGroup({
      name : new FormControl('', [Validators.required,Validators.pattern('^[a-z]{3,10}')]),
      email : new FormControl(''),
      password : new FormControl(''),
      address: new FormGroup({
        city : new FormControl(''),
        street : new FormControl(''),
    }),
    phoneNums:new FormArray([new FormControl('')])
  })
 }
  ngOnInit(): void {
    this.userRegisterForm.patchValue({
      name: 'shadwa',
      email: 'shadwa@gamail.com',
      // password:"22252",
      address: {
        city: '12345',
        street: '10',
      },
    });
    // this.userRegisterForm.setValue({
    //     name:"shadwa",
    //     email:"shadwa@gamail.com",
    //     password:"12345",
    //     address:{
    //       city:"asuit",
    //       street:"10"
    //     }
    //   })
  }
}
