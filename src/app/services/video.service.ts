import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export enum SearchType{
    all = ''
}
@Injectable({
    providedIn: 'root'
})
export class VideoService {
    url = 'http://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts';
    constructor(private http: HttpClient) {}

    searchData(): Observable<any>{
        return this.http.get('${this.url}').pipe(
            map(results => {
                console.log('Raw:', results);
                return results['Search'];
            })
        );
    }
    getDetails(){

    }

}