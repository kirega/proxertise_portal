import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PlaylistAddModalComponent } from '../playlist-add/playlist-add.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-playlist-detail',
    templateUrl: './playlist-detail.component.html',
    styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
    playlist;
    selectedPlaylist;
    playlistDetailForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private fetch: UtilsService,
        private auth: AuthService,
        public dialog: MatDialog

    ) { }

    ngOnInit() {
        this.createForm();
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        const url = 'http://localhost:8000/adverts/playlist/detail/' + id + '/';
        this.fetch.getList(url).subscribe(
            data => {
                this.playlist = data;
                this.loadDetails();
            }
        );

    }
    createForm() {
        console.log(this.playlist);
        this.playlistDetailForm = this.fb.group({
            name: ['',
                [Validators.required]
            ],
            start_date: ['', [Validators.required]],
            stop_date: ['', [Validators.required]],
            user: [this.auth.getId()],
            adverts: [[], Validators.required]
        });
    }
    loadDetails() {
        const url = this.fetch.url + 'adverts/list?id__in=' + this.playlist.adverts;
        this.fetch.getList(url)
            .subscribe(
                data => {
                    this.selectedPlaylist = data;
                },
                error => {
                    console.log(error);
                }
            );
        this.playlistDetailForm.patchValue({
            name: this.playlist.name,
            start_date: this.playlist.start_date,
            stop_date: this.playlist.stop_date,
            user: this.playlist.user,
            adverts: this.playlist.adverts
        });
    }
    openModal() {
        const dialogRef = this.dialog.open(PlaylistAddModalComponent, {
            width: '1200px',
        });
        dialogRef.afterClosed()
            .subscribe(result => {
                console.log('Dialog closed from details');
                console.log(result['adlist']);
            });
    }
}
