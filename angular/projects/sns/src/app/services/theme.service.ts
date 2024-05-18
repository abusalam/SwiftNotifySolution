import { Inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { StyleManagerService } from "./style-manager.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
	providedIn: "root",
})

export class ThemeService {

	private darkTheme:string = 'purple-green';
	isDark = signal<boolean>(false);
	isBrowser = false;
	
	constructor( @Inject(PLATFORM_ID) platformId: Object, private styleManager: StyleManagerService) {
		this.isBrowser = isPlatformBrowser(platformId);
		if(this.isBrowser) {
			if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
				this.setDarkTheme();
			}
		}
	}
	  
	private setDarkTheme() {
		this.isDark.set(true);
		this.styleManager.setStyle(
			this.darkTheme,
			`${this.darkTheme}.css`
		);
	}

	private removeDarkTheme() {
		this.styleManager.removeStyle(this.darkTheme);
	}

	toggleTheme() {
		this.isDark.update((value) => (value ? false : true));
		if (this.isDark()) {
			this.setDarkTheme()
		} else {
			this.removeDarkTheme()
		}
	}
}