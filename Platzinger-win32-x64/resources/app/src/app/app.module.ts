import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search';
import { FormsModule } from'@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthenticationGuard } from './services/authentication.guard';
import { ImageCropperModule } from 'ngx-image-cropper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { container } from '@angular/core/src/render3/instructions';
import { RequestComponent } from './modals/request/request.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'conversation/:uid', component: ConversationComponent, canActivate: [AuthenticationGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  declarations: [// Agregar componentes que nosostros mismos generemos
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent,
    ContactComponent
  ],
  imports: [//importar modulos de angular, que nos va a permitir extender las capacidades de nuestra app
    BrowserModule,
    RouterModule.forRoot(appRoutes),//va a añadir caracteristicas de navegación a nuestra aplicación
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,//permite acceder a métods que van a afectar l a base de datos directamente en firebase
    ImageCropperModule,
    NgbModule,
    BootstrapModalModule.forRoot({container:document.body})
  ],
  providers: [],//permite recibir servicios y recursos necesarios para nuestra aplicación
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]//al momento de llmarlo ya esté disponible para que se pueda mostrar, si no lo agregamos aqui, no lo va a encotnrrar bootrap
})
export class AppModule { }
