import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://localhost:3000';
  feed = new Array();
  followers = new Array();
  lastId = 0;
  
  constructor(
    private http: Http
  ) { }
  
  private getHeaders() {
    return new Headers({
      'content-type': 'application/json'
    })
  }
  
  public getFeed(maxId) {
    return this.http
      .post(this.baseUrl + '/getFeed',
        JSON.stringify(
          {
            "count": 50,
            "maxId": maxId
          }),
        { headers: this.getHeaders() }
      )
      .toPromise()
      .then(res => res.json())
      .catch(error => error.json())
  }
  
  public getFollowers() {
    return this.http
      .post(this.baseUrl + '/getFollowers',
        { headers: this.getHeaders() }
      )
      .toPromise()
      .then(res => res.json())
      .catch(error => error.json())
  }
  
  public postTweet(text) {
    return this.http
      .post(this.baseUrl + '/postTweet',
        JSON.stringify(
          {
            "text": text
          }),
        { headers: this.getHeaders() }
      )
      .toPromise()
      .then(res => res.json())
      .catch(error => error.json())
  }
  
  public setFeed(feed) {
    this.feed = feed;
    this.setIdOfLastTweet();
  }
  
  public getFeedWhenSet() {
    return this.feed.length > 0 ? this.feed : null;
  }
  
  public setFollowers(followers) {
    this.followers = followers;
  }
  
  public getFollowersWhenSet() {
    return this.followers.length > 0 ? this.followers : null;
  }
  
  setIdOfLastTweet() {
    this.lastId = this.feed[this.feed.length - 1].id;
  }
  
  getIdOfLastTweet() {
    return this.lastId;
  }
  
}
