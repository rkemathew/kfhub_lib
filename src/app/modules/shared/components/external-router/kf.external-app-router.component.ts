import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kf-external-app-router',
  templateUrl: './kf.external-app-router.component.html',
  styleUrls: ['./kf.external-app-router.component.less']
})
export class KFExternalAppRouterComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.location.href = 'http://localhost:3000/successprofile.html#/talentacquisition/tacqprojectsearch';
  }
}
