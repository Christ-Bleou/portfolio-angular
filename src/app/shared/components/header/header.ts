import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly document = inject(DOCUMENT);

  private readonly themePresets = [
    {
      key: 'green',
      label: 'Vert',
      themeHref: './assets/css/light.theme.css',
      colorHref: './assets/css/green.css',
    },
    {
      key: 'white',
      label: 'Blanc',
      themeHref: './assets/css/light.theme.css',
      colorHref: './assets/css/default.css',
    },
    {
      key: 'violet',
      label: 'Violet',
      themeHref: './assets/css/light.theme.css',
      colorHref: './assets/css/violet.css',
    },
  ] as const;

  private presetIndex = 1; // default: "Blanc"

  private readonly backgroundPresets = [
    { key: 'default', label: 'Défaut', bodyClass: null },
    { key: 'greenLight', label: 'Vert clair', bodyClass: 'bg-green-light' },
    { key: 'violet', label: 'Violet', bodyClass: 'bg-violet' },
  ] as const;

  private bgIndex = 0;

  get currentThemeLabel(): string {
    return this.themePresets[this.presetIndex]?.label ?? 'Theme';
  }

  get currentBackgroundLabel(): string {
    return this.backgroundPresets[this.bgIndex]?.label ?? 'Background';
  }

  ngOnInit(): void {
    const savedKey = this.safeLocalStorageGet('bleouctv_theme');
    const savedIndex = this.themePresets.findIndex((p) => p.key === savedKey);
    if (savedIndex >= 0) this.presetIndex = savedIndex;
    this.applyPreset(this.themePresets[this.presetIndex]);

    const savedBgKey = this.safeLocalStorageGet('bleouctv_bg');
    const savedBgIndex = this.backgroundPresets.findIndex((p) => p.key === savedBgKey);
    if (savedBgIndex >= 0) this.bgIndex = savedBgIndex;
    this.applyBackground(this.backgroundPresets[this.bgIndex]);
  }

  cycleTheme(): void {
    this.presetIndex = (this.presetIndex + 1) % this.themePresets.length;
    const preset = this.themePresets[this.presetIndex];
    this.safeLocalStorageSet('bleouctv_theme', preset.key);
    this.applyPreset(preset);
  }

  cycleBackground(): void {
    this.bgIndex = (this.bgIndex + 1) % this.backgroundPresets.length;
    const preset = this.backgroundPresets[this.bgIndex];
    this.safeLocalStorageSet('bleouctv_bg', preset.key);
    this.applyBackground(preset);
  }

  private applyPreset(preset: (typeof this.themePresets)[number]): void {
    const themeLink = this.document.getElementById('optional-theme') as HTMLLinkElement | null;
    const colorLink = this.document.getElementById('optional-color') as HTMLLinkElement | null;

    if (themeLink) themeLink.href = preset.themeHref;
    if (colorLink) colorLink.href = preset.colorHref;
  }

  private applyBackground(preset: (typeof this.backgroundPresets)[number]): void {
    const body = this.document.body;
    body.classList.remove('bg-green-light', 'bg-violet');
    if (preset.bodyClass) body.classList.add(preset.bodyClass);
  }

  private safeLocalStorageGet(key: string): string | null {
    try {
      return this.document.defaultView?.localStorage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  private safeLocalStorageSet(key: string, value: string): void {
    try {
      this.document.defaultView?.localStorage?.setItem(key, value);
    } catch {
      // ignore
    }
  }
}
