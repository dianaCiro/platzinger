import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() uid: string; //desde un componente padre me mande algun tipo de información
  contact: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserById(this.uid).valueChanges().subscribe((data: User)=> {
      this.contact = data;
    }, (err)=>{
      console.log(err)
    })
  }

}
