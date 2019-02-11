import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];
  query: string = '';
  user: User
  friendEmail: string = '';
  friendMessage: string = '';

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
     private route: Router, private modalService: NgbModal, private requestService: RequestsService) {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(error);
    });
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        if(this.user.friends){
          this.user.friends = Object.values(this.user.friends);
          console.log(this.user);
        }
       
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  logout(){
    this.authenticationService.logout().then(() => {
      alert('Sesión cerrada');
      this.route.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  sendRequest(){
    const  request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      message: this.friendMessage,
      status: 'pending'
    }
    this.requestService.createRequest(request).then(() => {
      alert('solicitud enviada');
    }).catch((error)=>{
      alert('hubo un error');
      console.log(error);
    })
  }

}