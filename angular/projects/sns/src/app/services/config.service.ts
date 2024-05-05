import { Injectable, inject } from '@angular/core';
import { AppConfig } from './interfaces/app-config.resp';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = '/assets/config.json';

  private config: AppConfig = {
    "apiBaseURL": ""
  };
  loaded = false;
  constructor(private http: HttpClient) { }

  loadConfig(): Promise<any> {
    return firstValueFrom(
      this.http
        .get<AppConfig>(this.configUrl)
        .pipe(tap(data => {
          this.config = data;
          this.loaded = true;
        }))
    )
  }

  getConfig(): AppConfig {
    console.log(this.config);
    return this.config;
  };

  getBaseUrl() {
    return this.config.apiBaseURL;
  }

  getConfigUrl() {
    return this.configUrl;
  }
}
