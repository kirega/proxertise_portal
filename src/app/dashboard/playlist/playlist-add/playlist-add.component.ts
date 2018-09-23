import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UtilsService } from '../../../services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.css']
})
export class PlaylistAddComponent implements OnInit {
  playlistForm: FormGroup;
  playlist;
  adlist: any[] = [];
  // selectedPlaylist: any[] = [];
  selectedPlaylist: any[] = [];
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private fetch: UtilsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.createForm();
    // this.fetchList();
  }
  createForm() {
    this.playlistForm = this.fb.group({
      name: ['',
        [Validators.required]
      ],
      start_date: ['', [Validators.required]],
      stop_date: ['', [Validators.required]],
      user: [this.auth.getId()],
      adverts: [[], Validators.required]
    });
  }
  fetchList() {
    const url = this.fetch.url + 'adverts/list/';
    this.fetch.getList(url)
      .subscribe(
        data => {
          this.playlist = data;
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
            console.log(error);
          }
        }
      );
  }


  openModal() {
    const dialogRef = this.dialog.open(PlaylistAddModalComponent, {
      width: '1200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.selectedPlaylist = result['data'];
      // console.log(this.selectedPlaylist);
    });
  }
}

// PlaylistAddModal Component

@Component({
  templateUrl: 'playlist-add-modal.html',
  styleUrls: ['playlist-add.component.css']
})
export class PlaylistAddModalComponent implements OnInit {
  selectedPlaylist;
  adlist: any[] = [];
  playlist;
  constructor(
    public dialogRef: MatDialogRef<PlaylistAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fetch: UtilsService,
  ) { }
  ngOnInit() {
    this.fetchList();
  }
  addToPlaylist(id: string) {
    this.adlist.push(id);
    // console.log(this.adlist);
  }
  done() {
    const url = this.fetch.url + 'adverts/list?id__in=' + this.adlist;
    console.log(url);
    if (this.adlist.length > 0) {
      this.fetch.getList(url)
        .subscribe(
          data => {
            this.selectedPlaylist = data;
            // console.log(this.selectedPlaylist);
            console.log(data);
            this.dialogRef.close({
              data: this.selectedPlaylist,
              error: 'none',
            });
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.dialogRef.close({
        data: [{'error': 'No data selected'}]
      }
      );
    }
  }
  fetchList() {
    const url = this.fetch.url + 'adverts/list/';
    this.fetch.getList(url)
      .subscribe(
        data => {
          this.playlist = data;
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
            console.log(error);
          }
        }
      );
  }
}
