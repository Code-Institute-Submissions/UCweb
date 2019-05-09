import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import {Rule} from '../models/rule';
import {HttpClient} from '@angular/common/http';
import * as AOS from 'aos';
import {VideosService} from '../services/videos.service';
import {ClashstatsService} from '../services/clashstats.service';




@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit {

  public videos: any;
  public items = [];
  public rules: Rule[];
  public clan: any;

  constructor(private http: HttpClient, private videosService: VideosService,
              private firestoreService: FirestoreService, private  clashStats: ClashstatsService) {

  }

  ngOnInit() {
    this.videosService.getVideos().subscribe( response => {
        this.videos = response;
        this.items = this.videos.items;
      });

    this.firestoreService.getRules().subscribe(rules => {
      this.rules = rules;
    });

    this.clashStats.getStats().subscribe( stats => {
      this.clan = stats;
      console.log(stats);
    });

    AOS.init();
  }


}
