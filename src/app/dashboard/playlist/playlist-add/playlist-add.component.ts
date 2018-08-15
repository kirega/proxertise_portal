import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.css']
})
export class PlaylistAddComponent implements OnInit {
  playlistForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.playlistForm = this.fb.group({
      name: ['',
        [Validators.required]
      ],
      start_date: ['', [Validators.required]],
      stop_date: ['', [Validators.required]],
      user: [this.auth.getId(), ]
    });
  }

}
