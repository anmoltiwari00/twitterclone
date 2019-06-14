import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  feeds = new Array();
  loading: boolean = false;
  moreLoading: boolean = false;
  lastId = 0;
  danger: boolean = false;
  errorLoadingMore: boolean = false;
  constructor(
    private dataService: DataService
  ) { 
    this.loadMoreTweets = this.loadMoreTweets.bind(this);
  }

  ngOnInit() {
    this.loading = true;
    var existingFeed = this.dataService.getFeedWhenSet();
    !existingFeed ?  
      this.dataService.getFeed(null)
        .then(res => this.setFeed(res.data)) : 
      this.setExistingFeed(existingFeed);
      
      this.addScrollListener();
  }
  
  ngOnDestroy() {
    document.removeEventListener('scroll', this.loadMoreTweets, true);
  }
  
  setFeed(feed) {
    this.loading = false;
    if(feed) {
      console.log(feed);
      this.feeds = feed;
      this.dataService.setFeed(this.feeds);
    } else {
        this.danger = true;
    }
  }
  
  setExistingFeed(existingFeed) {
    this.feeds = existingFeed;
    this.loading = false;
  }
  
  addScrollListener() {
    document.addEventListener('scroll', this.loadMoreTweets, true);
  }
  
  loadMoreTweets() {
    this.lastId = this.dataService.getIdOfLastTweet();
    const lastTweet = document.querySelector(`#b${this.lastId}`);
    const lastTweetTop = lastTweet.getBoundingClientRect().top;
    if(lastTweetTop < (window.innerHeight || document.documentElement.clientHeight)) {
      document.removeEventListener('scroll', this.loadMoreTweets, true);
      this.moreLoading = true;
      this.dataService.getFeed(this.lastId)
        .then(res => this.addMoreTweets(res.data))
    }
  }
  
  addMoreTweets(res) {
    if(res) {
      this.errorLoadingMore = false;
      res.forEach(item => this.feeds.push(item));
      this.dataService.setFeed(this.feeds);
      document.addEventListener('scroll', this.loadMoreTweets, true);
    } else {
      this.errorLoadingMore = true;
      document.addEventListener('scroll', this.loadMoreTweets, true);
    }
  }
}
