import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactRoutingModule } from './contact-us-routing.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [CommonModule, ContactRoutingModule],
})
export class ContactModule {}
