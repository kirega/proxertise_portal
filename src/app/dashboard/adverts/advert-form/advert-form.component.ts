import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationService } from '../../../services/navigation.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-advert-form',
  templateUrl: './advert-form.component.html',
  styleUrls: ['./advert-form.component.css']
})
export class AdvertFormComponent implements OnInit {
  advertForm: FormGroup;
  imagefile;
  error = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private nav: NavigationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.createForm();
  }
  private prepareSave(): FormData {
    const input = new FormData();
    input.append('title', this.advertForm.get('title').value);
    input.append('duration', this.advertForm.get('duration').value);
    input.append('user', this.auth.getId());
    return input;
  }
  readThis(inputValue): void {
    const file: File = inputValue.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagefile = myReader.result;
    };
    myReader.readAsDataURL(file);
  }
  upload(UploadFile: FormGroup) {
    const formModel = this.prepareSave();
    formModel.append('upload', this.imagefile);
    console.log(formModel);

    this.http.post('http://localhost:8000/adverts/list/', formModel)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  createForm() {
    this.advertForm = this.fb.group({
      title: ['',
        [Validators.required]
      ],
      duration: ['', []],
      upload: ['', [Validators.required]],
      user: [this.auth.getId(), ]
    });
  }
}
