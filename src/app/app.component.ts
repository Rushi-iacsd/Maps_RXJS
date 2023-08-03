import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concatMap, delay, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'practice1';

  baseUrl =  `https://jsonplaceholder.typicode.com/posts`
 
    of$ = of(1,5,7,9,10,12)

 postwithMap$ = of(1,5,7,9,10,12)
       .pipe(
        tap(n => console.log(n)),

        map(n => this._http.get(`${this.baseUrl}/${n}`))
       )


     /////// Concat Map //////

    postwithConcatMap$ = this.of$
                  .pipe(
                    tap(n => console.log(`Flat using Concat Map ${n}`)),

                    map(n => {
                      delay(1000/n)
                      return n
                    }),
                    concatMap(n => this._http.get(`${this.baseUrl}/${n}`))
                 )


    ////// Merge Map ////////

     postwithMergerMAp$ = this.of$
                 .pipe(
                  tap(n => console.log(`Flat using Merge Map ${n}`)),
                  map(n => {
                    delay(1000/n)
                    return n 
                  }),
                  mergeMap(n => this._http.get(`${this.baseUrl}/${n}`))
                 )


   /////// Switch Map //////////

     postwithSwitchMap$ = this.of$
     .pipe(
      tap(n => console.log(`Flat using Switch Map ${n}`)),
      map(n => {
        delay(1000/n)
        return n 
      }),
      switchMap(n =>  this._http.get(`${this.baseUrl}/${n}`))
     )                     


  constructor(private _http : HttpClient){

  }

  ngOnInit(): void {
      // this.of$
      // .pipe(
      //   tap(n => console.log(n)),
      //   // map(n => `The Value is ${n}`),
      //   // tap(n => console.log(n))
      // )
      //  .subscribe(res => {
       
      //   this._http.get(`${this.baseUrl}/${res}`)
      //   .subscribe(res => {
      //     console.log(res)
      //   })
      //  })

   
      // this.postwithMap$.subscribe(res => {
      //   console.log(res)
      // //  console.log(this.postwithMap$)
      // res.subscribe(console.log)
      // })


     this.postwithConcatMap$
     .subscribe(res => {
      console.log(res)
     })


     this.postwithMergerMAp$
     .subscribe(res => {
      console.log(res)
     })


     this.postwithSwitchMap$
     .subscribe(res => {
      console.log(res)
     })


  }

}


