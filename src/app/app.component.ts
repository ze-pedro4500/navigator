import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document,private formBuilder: FormBuilder, private http: HttpClient) {
        this.innerWidth = (window.screen.width) + "px";
        this.height = (screen.height)+ "px";
   }
  title = 'navigator';
  submit = false;
  scrollto : number;
    innerWidth: any;
    height:any;
    french = false;
    SERVER_URL='./includes.signup.php'
    submitted=false;
    form: FormGroup;
    codes: string;
    repetido=false;
    notchecked=false;
    
    ngOnInit(){
      
      this.form = this.formBuilder.group({
        nome: ['',Validators.required],
        email: ['',Validators.required],
        loja: ['',Validators.required],
        data: ['',Validators.required],
        ReamCode: ['',Validators.required],
        pais: ['',Validators.required]
      })
    }
    
    get f(){
      return this.form.controls;
    }

     retira_acentos(str) 
{

    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";

let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let novastr="";
    for(let i=0; i<str.length; i++) {
        let troca=false;
        for (let a=0; a<com_acento.length; a++) {
            if (str.substr(i,1)==com_acento.substr(a,1)) {
                novastr+=sem_acento.substr(a,1);
                troca=true;
                break;
            }
        }
        if (troca==false) {
            novastr+=str.substr(i,1);
        }
    }
    return novastr;
}       

    decodeCodes(codes:string){
      let codeArray= [];
      let index=0;
      let number= "";
      let virgulas=0;
      let v=0;
      for(let i=0;i<codes.length;i++){
        if(codes.charAt(i)!='"'){
          if(virgulas===3){
            number=number+codes.charAt(i);
          }
        }
        
        
        if(codes.charAt(i)==='"'){
          virgulas=virgulas+1;
        }
        if(virgulas===4){
          codeArray.push(number);
          virgulas=0;
          number = "";
        }
        
      }
      
      return codeArray;}
    


     delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }


    async submeter(){
      this.repetido=false;
      this.http.get('./includes/getcodes.php',{responseType: 'text'}).subscribe(res => this.codes=res);
      await this.delay(1000);
      let codeArray=this.decodeCodes(this.codes);
      this.delay(1000);
      for(let i=0;i<codeArray.length;i++){
        console.log(this.form.value['ReamCode']);
        console.log(codeArray[i]);
        if(this.form.value['ReamCode']===parseInt(codeArray[i])){
          this.repetido=true;
    await this.delay(4000);
    this.repetido=false;
          return;
        }
      }
      var element = <HTMLInputElement> document.getElementById("check");
var isChecked = element.checked;
if(!isChecked){
  this.notchecked=true;
  await this.delay(4000);
  this.notchecked=false;
  return;
}
      this.submitted=true;
      if(this.form.invalid){
        return;
      }
      this.submit=true;
      await this.delay(1000);
      scrollTo(0,this.scrollto);
      let header = new HttpHeaders();
      this.http.post<any>('./includes/signup.php', { nome: this.retira_acentos(this.form.value['nome']),email: this.form.value['email'],loja:this.form.value['loja'],data: this.form.value['data'], ReamCode: this.form.value['ReamCode'],pais: this.form.value['pais'] }, {headers : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })}).subscribe(data => {
    });
    this.form.reset();
    this.submitted=false;
}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    //STRIPES
    console.log(innerWidth);
    console.log("height "+this.height);
    if(innerWidth>=2000){
      this.scrollto=3244;
      if (document.body.scrollTop > 590 ||     
        document.documentElement.scrollTop > 590) {
          
          document.getElementById('resma').classList.add('fade1');
          document.getElementById('text').classList.add('fade1');
        }
        if (document.body.scrollTop >990 ||     
          document.documentElement.scrollTop > 990) {
            document.getElementById('text2').classList.add('fade1');
            document.getElementById('iphone').classList.add('fade1');
          }
          if (document.body.scrollTop >1400 ||     
            document.documentElement.scrollTop > 1400) {
              document.getElementById('wt').classList.add('fade1');
              document.getElementById('butcont').classList.add('fade1');
            }
    if (document.body.scrollTop > 1500 ||     
    document.documentElement.scrollTop > 1500) {
      
      document.getElementById('stripe3').classList.add('anim3');
      
    }
    if (document.body.scrollTop >2100 ||     
      document.documentElement.scrollTop > 2100) {
        document.getElementById('form').classList.add('fade2');
        document.getElementById('winan').classList.add('fade2');
        document.getElementById('terms').classList.add('fade2');
      }
    if (document.body.scrollTop >2800 ||     
      document.documentElement.scrollTop > 2800) {
        if(this.submit){
        document.getElementById('stripe4').classList.add('anim4');
        document.getElementById('tybox').classList.add('fade1');
        }else{
          if (document.body.scrollTop >2500 ||     
            document.documentElement.scrollTop > 2500){
          document.getElementById('footer2').classList.add('fade1');}
        }

      }
      if (document.body.scrollTop >3300 ||     
        document.documentElement.scrollTop > 3300) {
          if(this.submit)
          document.getElementById('footer').classList.add('fade1');
        }
  }

  if(innerWidth<2000 && innerWidth >=1700){
    if (document.body.scrollTop > 1500 ||     
    document.documentElement.scrollTop > 1500) {
      console.log(innerWidth);
      document.getElementById('stripe3').classList.add('anim3');

    }
    if (document.body.scrollTop >2500 ||     
      document.documentElement.scrollTop > 2500) {
        if(this.submit){
        document.getElementById('stripe4').classList.add('anim4');
        document.getElementById('tybox').classList.add('fade1');
        }else {
          if (document.body.scrollTop >2500 ||     
            document.documentElement.scrollTop > 2500){
          document.getElementById('footer2').classList.add('fade1');}
        }
      }
  }

  if(innerWidth<1500 && innerWidth >=1400){
    if (document.body.scrollTop > 1300 ||     
    document.documentElement.scrollTop > 1300) {
      console.log(innerWidth);
      document.getElementById('stripe3').classList.add('anim3');
    }
    if (document.body.scrollTop >2100 ||     
      document.documentElement.scrollTop > 2100) {
        if(this.submit){
          console.log(this.submit);
        document.getElementById('stripe4').classList.add('anim4');
        document.getElementById('tybox').classList.add('fade1');
        }else {
          if (document.body.scrollTop >2200 ||     
            document.documentElement.scrollTop > 2200){
          document.getElementById('footer2').classList.add('fade1');
        }
        }
      }
      }

  if(innerWidth<1300 && innerWidth >=1000){
    if (document.body.scrollTop > 1100 ||     
    document.documentElement.scrollTop > 1100) {
      console.log(innerWidth);
      document.getElementById('stripe3').classList.add('anim3');
    }
    if (document.body.scrollTop >2600 ||     
      document.documentElement.scrollTop > 2600) {
        if(this.submit){
        document.getElementById('stripe4').classList.add('anim4');
        document.getElementById('tybox').classList.add('fade1');
      }else {
        if (document.body.scrollTop >2000 ||     
          document.documentElement.scrollTop > 2000){
        document.getElementById('footer2').classList.add('fade1');
      }
      }
    }
  }

  /*TABLET---------------------------------------------------------------------------------------------------*/
  if(this.height>1300 && innerWidth >1000 && this.height<1500 ){
    if (document.body.scrollTop > 800 ||     
    document.documentElement.scrollTop > 800) {
      console.log(innerWidth);
      document.getElementById('stripe3').classList.add('anim3');
    }
    if (document.body.scrollTop >2200 ||     
      document.documentElement.scrollTop > 2200) {
        if(this.submit){
        document.getElementById('stripe4').classList.add('anim4');
        document.getElementById('tybox').classList.add('fade1');
      }else {
        if (document.body.scrollTop >1900 ||     
          document.documentElement.scrollTop > 1900){
        document.getElementById('footer2').classList.add('fade1');
      }
      }
      this.scrollto=2500;
    if (document.body.scrollTop >80 ||     
      document.documentElement.scrollTop > 80) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >300 ||     
        document.documentElement.scrollTop > 300) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >700 ||     
          document.documentElement.scrollTop > 700) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2300 ||     
            document.documentElement.scrollTop > 2300) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1300 ||     
              document.documentElement.scrollTop > 1300) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }
    }
  }

  if(innerWidth<1150 && innerWidth >=1050){
    if (document.body.scrollTop > 880 ||     
      document.documentElement.scrollTop > 1000) {
        console.log(innerWidth);
        document.getElementById('stripe3').classList.add('anim3');
      }
      if (document.body.scrollTop >1250 ||     
        document.documentElement.scrollTop > 1250) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
          }else{
            if (document.body.scrollTop >2100 ||     
              document.documentElement.scrollTop > 2100){
            document.getElementById('footer2').classList.add('fade1');}
          }
        }
        }

  

  if(innerWidth<1050 && innerWidth >=950){
    if (document.body.scrollTop > 880 ||     
      document.documentElement.scrollTop > 1000) {
        console.log(innerWidth);
        document.getElementById('stripe3').classList.add('anim3');
      }
      if (document.body.scrollTop >1250 ||     
        document.documentElement.scrollTop > 1250) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
          }else{
            if (document.body.scrollTop >1900 ||     
              document.documentElement.scrollTop > 1900){
            document.getElementById('footer2').classList.add('fade1');}
          }
        }
        }




  if(innerWidth<950 && innerWidth >=850){
    if (document.body.scrollTop > 880 ||     
      document.documentElement.scrollTop > 1000) {
        console.log(innerWidth);
        document.getElementById('stripe3').classList.add('anim3');
      }
      if (document.body.scrollTop >1250 ||     
        document.documentElement.scrollTop > 1250) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
          }else{
            if (document.body.scrollTop >1900 ||     
              document.documentElement.scrollTop > 1900){
            document.getElementById('footer2').classList.add('fade1');}
          }
        }
        }
  

  if(innerWidth<850 && innerWidth >=750){
    if (document.body.scrollTop > 880 ||     
      document.documentElement.scrollTop > 1000) {
        console.log(innerWidth);
        document.getElementById('stripe3').classList.add('anim3');
      }
      if (document.body.scrollTop >1250 ||     
        document.documentElement.scrollTop > 1250) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
          }else{
            if (document.body.scrollTop >1800 ||     
              document.documentElement.scrollTop > 1800){
            document.getElementById('footer2').classList.add('fade1');}
          }
        }
        }

  if(innerWidth<750 && innerWidth >=650){
    if (document.body.scrollTop > 880 ||     
      document.documentElement.scrollTop > 1000) {
        console.log(innerWidth);
        document.getElementById('stripe3').classList.add('anim3');
      }
      if (document.body.scrollTop >1250 ||     
        document.documentElement.scrollTop > 1250) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
          }else{
            if (document.body.scrollTop >1800 ||     
              document.documentElement.scrollTop > 1800){
            document.getElementById('footer2').classList.add('fade1');}
          }
        }
        }

  if(innerWidth<650 && innerWidth >=500){
    if (document.body.scrollTop > 880 ||     
      document.documentElement.scrollTop > 880) {
        console.log(innerWidth);
        document.getElementById('stripe3').classList.add('anim3');
      }
      if (document.body.scrollTop >1250 ||     
        document.documentElement.scrollTop > 1250) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
          }else{
            if (document.body.scrollTop >1700 ||     
              document.documentElement.scrollTop > 1700){
            document.getElementById('footer2').classList.add('fade1');}
          }
        }
        }






  /*MOBILE*/
  if(innerWidth<500 && this.height>800 && this.height<900){
    this.scrollto=3342;
    if (document.body.scrollTop > 100 ||     
      document.documentElement.scrollTop > 100) {
        
        document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >200 ||     
        document.documentElement.scrollTop > 200) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >500 ||     
          document.documentElement.scrollTop > 500) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >3400 ||     
            document.documentElement.scrollTop > 3400) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >800 ||     
              document.documentElement.scrollTop > 800) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }
    if (document.body.scrollTop > 880 ||     
      document.documentElement.scrollTop > 880) {
        console.log(innerWidth);
        document.getElementById('stripe3').classList.add('anim3');
      }
      if (document.body.scrollTop >1250 ||     
        document.documentElement.scrollTop > 1250) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
          }else{
            if (document.body.scrollTop >1300 ||     
              document.documentElement.scrollTop > 1300){
            document.getElementById('footer2').classList.add('fade1');}
          }
        }
  } 


  // ITEMS
  console.log("Width: "+innerWidth);
  console.log("Scroll: "+document.body.scrollTop+" "+document.documentElement.scrollTop);

    if(innerWidth>=2000){
      this.scrollto=3244;
    
        
         
          
  }

  if(innerWidth<2000 && innerWidth >=1700){
    this.scrollto=3342;
    if (document.body.scrollTop > 400 ||     
      document.documentElement.scrollTop > 400) {
        
        document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >600 ||     
        document.documentElement.scrollTop > 600) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >1200 ||     
          document.documentElement.scrollTop > 1200) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >3400 ||     
            document.documentElement.scrollTop > 3400) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >2000 ||     
              document.documentElement.scrollTop > 2000) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }
  }

  if(innerWidth<1700 && innerWidth >=1500){
    this.scrollto=2822;
    if (document.body.scrollTop >200 ||     
      document.documentElement.scrollTop > 200) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >400 ||     
        document.documentElement.scrollTop > 400) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >1000 ||     
          document.documentElement.scrollTop > 1000) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >3000 ||     
            document.documentElement.scrollTop > 3000) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1700 ||     
              document.documentElement.scrollTop > 1700) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }
  }


  if(innerWidth<1500 && innerWidth >=1400){
    this.scrollto=2700;
    if (document.body.scrollTop >200 ||     
      document.documentElement.scrollTop > 200) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >400 ||     
        document.documentElement.scrollTop > 400) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >900 ||     
          document.documentElement.scrollTop > 900) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2100 ||     
            document.documentElement.scrollTop > 2100) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1700 ||     
              document.documentElement.scrollTop > 1700) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }
  }

  if(innerWidth<1300 && innerWidth >=1000){
    this.scrollto=2649;
    if (document.body.scrollTop >100 ||     
      document.documentElement.scrollTop > 100) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >350 ||     
        document.documentElement.scrollTop > 350) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >800 ||     
          document.documentElement.scrollTop > 800) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2500 ||     
            document.documentElement.scrollTop > 2500) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1400 ||     
              document.documentElement.scrollTop > 1400) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }
  }



  if(innerWidth<1150 && innerWidth >=1050){
    this.scrollto=2500;
    if (document.body.scrollTop >300 ||     
      document.documentElement.scrollTop > 300) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >600 ||     
        document.documentElement.scrollTop > 600) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >1000 ||     
          document.documentElement.scrollTop > 1000) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2300 ||     
            document.documentElement.scrollTop > 2300) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1450 ||     
              document.documentElement.scrollTop > 1450) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }

  }


  if(innerWidth<1050 && innerWidth >=950){
    this.scrollto=2300;
    if (document.body.scrollTop >80 ||     
      document.documentElement.scrollTop > 80) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >400 ||     
        document.documentElement.scrollTop > 400) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >700 ||     
          document.documentElement.scrollTop > 700) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2300 ||     
            document.documentElement.scrollTop > 2300) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1300 ||     
              document.documentElement.scrollTop > 1300) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }

  }


  if(innerWidth<950 && innerWidth >=850){
    this.scrollto=2600;
    if (document.body.scrollTop >200 ||     
      document.documentElement.scrollTop > 200) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >400 ||     
        document.documentElement.scrollTop > 400) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >700 ||     
          document.documentElement.scrollTop > 700) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2300 ||     
            document.documentElement.scrollTop > 2300) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1300 ||     
              document.documentElement.scrollTop > 1300) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }

  }



  if(innerWidth<850 && innerWidth >=750){
    this.scrollto=2300;
    if (document.body.scrollTop >80 ||     
      document.documentElement.scrollTop > 80) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >400 ||     
        document.documentElement.scrollTop > 400) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >700 ||     
          document.documentElement.scrollTop > 700) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2300 ||     
            document.documentElement.scrollTop > 2300) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1300 ||     
              document.documentElement.scrollTop > 1300) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }

  }

  if(innerWidth<750 && innerWidth >=650){
    this.scrollto=2300;
    if (document.body.scrollTop >120 ||     
      document.documentElement.scrollTop > 120) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >400 ||     
        document.documentElement.scrollTop > 400) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >800 ||     
          document.documentElement.scrollTop > 800) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2300 ||     
            document.documentElement.scrollTop > 2300) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1300 ||     
              document.documentElement.scrollTop > 1300) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }

  }

  if(innerWidth<650 && innerWidth >=500){
    this.scrollto=2200;
    if (document.body.scrollTop >150 ||     
      document.documentElement.scrollTop > 150) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >350 ||     
        document.documentElement.scrollTop > 350) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >870 ||     
          document.documentElement.scrollTop > 870) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
          }
          if (document.body.scrollTop >2000 ||     
            document.documentElement.scrollTop > 2000) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >1300 ||     
              document.documentElement.scrollTop > 1300) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }

  }

/*MOBILE*/
  if(innerWidth <=500){
    this.scrollto=1800;
      if (document.body.scrollTop >1300 ||     
        document.documentElement.scrollTop > 1300) {
          if(this.submit){
          document.getElementById('stripe4').classList.add('anim4');
          document.getElementById('tybox').classList.add('fade1');
        }else{
          if (document.body.scrollTop >1300 ||     
            document.documentElement.scrollTop > 1300){
          document.getElementById('footer2').classList.add('fade1');}
        }

        }
    if (document.body.scrollTop >150 ||     
      document.documentElement.scrollTop > 150) {
    document.getElementById('resma').classList.add('fade1');
        document.getElementById('text').classList.add('fade1');
      }
      if (document.body.scrollTop >350 ||     
        document.documentElement.scrollTop > 350) {
          document.getElementById('text2').classList.add('fade1');
          document.getElementById('iphone').classList.add('fade1');
        }
        if (document.body.scrollTop >600 ||     
          document.documentElement.scrollTop > 600) {
            document.getElementById('wt').classList.add('fade1');
            document.getElementById('butcont').classList.add('fade1');
            document.getElementById('stripe3').classList.add('anim3');
          }
          if (document.body.scrollTop >2000 ||     
            document.documentElement.scrollTop > 2000) {
              if(this.submit)
              document.getElementById('footer').classList.add('fade1');
            }
            if (document.body.scrollTop >800 ||     
              document.documentElement.scrollTop > 800) {
                document.getElementById('form').classList.add('fade2');
                document.getElementById('winan').classList.add('fade2');
                document.getElementById('terms').classList.add('fade2');
              }
              
  }


}
}
