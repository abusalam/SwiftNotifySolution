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

  key = inject(ConfigService).getBaseUrl();
  
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  getData(key: string, useDecryption: boolean = false) {
    const data = this.storage.getItem(key) || "";
    return useDecryption ? this.decrypt(data) : data;
  }

  saveData(key: string, value: string, useEncryption: boolean = false) {
    this.storage.setItem(key, useEncryption ? this.encrypt(value): value);
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

@Injectable()
export class BrowserStorageServerService extends BrowserStorageService {
  constructor() {
    super({
      clear: () => {},
      getItem: (key: string) => JSON.stringify({ key }),
      setItem: (key: string, value: string) => JSON.stringify({ [key]: value }),
      key: (index: number) => index.toString(),
      length: 0,
      removeItem: (key: string) => JSON.stringify({ key }),
    });
  }
}
