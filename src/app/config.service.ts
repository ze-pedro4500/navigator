// config.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  performPOST() {  
    console.log("POST");  
    let url = `./includes/signup.php`;  
    this.http.post(url, {name:"foo",email:"loo"}).subscribe(res =>  
    console.log(res));  
}  
}