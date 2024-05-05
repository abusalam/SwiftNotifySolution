import { Inject, Injectable, InjectionToken, inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from './config.service';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});
@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  
  encryptionEnabled:boolean=false;

  key = inject(ConfigService).getBaseUrl();
  
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  getData(key: string) {
    const data = this.storage.getItem(key) || "";
    return this.encryptionEnabled ? this.decrypt(data) : data;
  }

  saveData(key: string, value: string) {
    this.storage.setItem(key, this.encryptionEnabled ? this.encrypt(value): value);
  }

  removeData(key: string) {
    return this.storage.removeItem(key);
  }
  clearData() {
    return this.storage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }
  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}