import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers = new Array();
  loading: boolean = false;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loading = true;
    var existingFollowers = this.dataService.getFollowersWhenSet();
    !existingFollowers ?  
      this.dataService.getFollowers()
        .then(res => this.setFollowers(res.data.users)) : 
      this.setExistingFollowers(existingFollowers);
  }
  
  setFollowers(followers) {
    this.followers = followers;
    this.dataService.setFollowers(this.followers);
    this.loading = false;
  }
  
  setExistingFollowers(existingFollowers) {
    this.followers = existingFollowers;
    this.loading = false;
  }

}
