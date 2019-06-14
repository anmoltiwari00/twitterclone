import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  tweetButton = "";
  posting = false;
  success = false;
  danger = false;
  disabled = true;
  cLeft = 280;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }
  
  checkDisabled() {
    this.cLeft = 280 - this.tweetButton.length;
    this.tweetButton && this.tweetButton.length <= 280 ? this.toggleDisable(false) : this.toggleDisable(true); 
  }
  
  toggleDisable(bool) {
    this.disabled = bool;
  }
  
  tweet() {
    this.dataService.postTweet(this.tweetButton)
      .then(res => this.posted(res));
  }
  
  posted(res) {
    this.tweetButton = null
    if(res.data && res.data.id) {
      this.success = true
      setTimeout(() => { this.success = false }, 5000);
      console.log(res.data);
    } else {
      this.danger = true;
      setTimeout(() => { this.danger = false }, 5000);
    }
  }

}
