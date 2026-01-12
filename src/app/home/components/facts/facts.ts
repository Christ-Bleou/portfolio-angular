import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facts.html',
})
export class Facts {
  profileService = inject(ProfileService);
}
