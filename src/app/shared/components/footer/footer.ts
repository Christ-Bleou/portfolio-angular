import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
})
export class Footer {
  // 1. Récupère l'année actuelle automatiquement
  currentYear = new Date().getFullYear();

  // 2. On injecte le service pour avoir accès aux réseaux sociaux (voir suite)
  profileService = inject(ProfileService);
}
