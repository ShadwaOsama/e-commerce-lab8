import { Component, OnInit } from '@angular/core';
import { StaticProductsService } from '../../services/static-products.service';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { languageAction } from '../../store/language/language.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  currentLang: string | undefined;
  isUserLoggedIn!: boolean
  language$:Observable<string> | undefined
  counter$: Observable<number>
constructor(private userAuthSer:UserAuthService,private store:Store<{counter:number,language:string}>){
  this.counter$=this.store.select('counter')
    this.language$ = this.store.select('language')
    this.language$.subscribe(lang => this.currentLang = lang)
}
  ngOnInit(): void {
    // this.isUserLoggedIn= this.userAuthSer.getUserLogged()
    this.userAuthSer.getAuthSubject().subscribe({
      next:(status)=>{
        this.isUserLoggedIn= status
      }
    })
  }
  changeLang(){
    this.store.dispatch(languageAction({lang:(this.currentLang=='en')?'ar':'en'}));
  }
}
