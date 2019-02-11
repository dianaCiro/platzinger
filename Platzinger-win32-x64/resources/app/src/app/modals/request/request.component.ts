import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';
import { extend } from 'webdriver-js-extender';
import { RequestsService } from 'src/app/services/requests.service';
import { User } from 'src/app/interfaces/user';

export interface PromptModel{
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel, OnInit {
  scope: any;//llega tanto el usuario logueado como el amigo al que voy a agregar y el request
  shouldAdd: string = 'yes';
  currentRequest: any;
  user: any

  constructor(public dialogService: DialogService, private userService: UserService, private requestsService: RequestsService) {
    super(dialogService);
    
  }

  ngOnInit(){
    if(this.currentRequest){
      this.userService.getUserById(this.currentRequest.sender).valueChanges().subscribe((u: User) => {
      this.user = u;
    }, (err) => {
      console.log(err);
    });
    }
    
  }
  
  accept() {
    if (this.shouldAdd == 'yes') {
      this.requestsService.setRequestStatus(this.currentRequest, 'accepted').then((data) => {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud aceptada con eexito');
        });
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd == 'no') {
      this.requestsService.setRequestStatus(this.currentRequest, 'rejected').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd == 'later') {
      this.requestsService.setRequestStatus(this.currentRequest, 'decide_later').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}