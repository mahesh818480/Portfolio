import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  isSending = false;
  showSuccessModal = false;
  submitted = false;          // 👈 track if user clicked submit

  private serviceId = 'service_8uvk2ny';
  private templateId = 'template_r4fcua8';
  private publicKey = '2s2oy0GviP49rnzIx';

  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;  
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;

    const formValue = this.contactForm.value;

    const templateParams = {
      name: formValue.name,
      email: formValue.email,
      title: 'New Message',
      message: formValue.message,
      phone: formValue.phone,
    };

    emailjs
      .send(this.serviceId, this.templateId, templateParams, {
        publicKey: this.publicKey,
      })
      .then(
        (res) => {
          console.log('SUCCESS!', res);
          this.contactForm.reset();
          this.submitted = false;
          this.isSending = false;
          this.showSuccessModal = true;

          setTimeout(() => (this.showSuccessModal = false), 3000);
        },
        (err) => {
          console.error('FAILED...', err);
          alert('Failed to send message ❌ Please try again.');
          this.isSending = false;
        }
      );
  }

  closeModal() {
    this.showSuccessModal = false;
  }
}
