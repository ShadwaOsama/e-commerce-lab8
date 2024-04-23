import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription ,map} from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decreaseCounter, increaseCounter } from '../../store/counter/counter.action';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  notifications: string[] = [];
  subscription!: Subscription;
  counter:Observable<number>
  count!:number
  constructor(private notificationService: NotificationService, private store:Store<{counter:number}>) {
    this.counter=this.store.select('counter')
  this.counter.subscribe((newVal: number)=>{
  this.count=newVal;
  })
  }

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotifications().pipe(
      filter(notification => notification.startsWith('hamada'))
    ).subscribe({
      next: (notification) => {
        this.notifications.push(notification + ' shadwa');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Notification stream completed successfully');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  increaseCountVal(){
    this.store.dispatch(increaseCounter())
  }
  decreaseCountVal(){
    this.store.dispatch(decreaseCounter())
  }
}






