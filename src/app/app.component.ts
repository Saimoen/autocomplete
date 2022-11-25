import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  nationalities: string[] = ['Française', 'Espagnol'];
  cities: string[] = ['Nouméa', 'Païta', 'Dumbéa'];

  contactForm: FormGroup;

  constructor(private form: FormBuilder, private http: HttpClient) {
    this.contactForm = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      console.log(this.contactForm.errors);
      return;
    }

    this.http
      .post('http://localhost:1337/api/contacts', this.contactForm.value)
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
