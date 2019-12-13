import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const dataObj = JSON.parse(localStorage.getItem('currentUser') || null);
    let dataObjDatatoJson: User;
    if (dataObj !== null) {
      // 过期时间为1天
      if (new Date().getTime() - dataObj.time > 1000 * 60 * 60 * 24) {
        console.log('信息过期!');
      } else {
        // dataObjDatatoJson = JSON.parse(dataObj.data || null);
        dataObjDatatoJson = dataObj.data;
      }
    }
    this.currentUserSubject = new BehaviorSubject<User>(dataObjDatatoJson);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate`, {
        username,
        password
      })
      .pipe(
        map(user => {
          const curTime = new Date().getTime();
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ data: user, time: curTime })
          );
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
