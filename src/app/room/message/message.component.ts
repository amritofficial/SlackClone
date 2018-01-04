import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {
  message: string;
  channelId: any;
  messages: any;
  channelData: any;
  channelName: string;
  constructor(private messageService: MessageService, private db: AngularFireDatabase, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getMessages();
  }

  ngOnChanges() {
    this.channelId = this.activeRoute.snapshot.params['cid'];
    this.getChannelName(this.channelId);
  }

  sendMessage() {
    console.log('Message Sent ' + this.message);
    this.channelId = this.activeRoute.snapshot.params['cid'];
    this.messageService.storeMessage(this.channelId, this.message);
    this.message = '';
    console.log('ChannelId ' + this.channelId);
    this.getMessages();
  }

  getMessages() {
    this.db.list('/-L1xN4usuvDLVbz55GfM/channelMessages').valueChanges().subscribe(data => {
      this.messages = data;
      console.log(data);
    });
  }

  getChannelName(channelId: string) {
    this.db.list(`/channels/${channelId}`).valueChanges()
    .subscribe(data => {
      this.channelData = data;
      this.channelName = this.channelData.name;
      console.log(":::: " + this.channelName);
    });
  }

}