/// <reference path="../../node_modules/@types/chrome/index.d.ts"/>
/// <reference path="main.ts" />

namespace AlwaysOnWcm {

    class BgScript extends Utils {
        constructor() {
            super();
            this.initListener();
            updateIcon();
        }

        private initListener() {
            chrome.runtime.onInstalled.addListener(function() {
                let setKey: IAoWCMSetter = {
                    [WCMMode.wcmModeKey] : "none"
                  };
                chrome.storage.sync.set(setKey, function() {
                    // set value
                });
            });
        }

        public updateIcon(): void {
            let key: string = WCMMode.wcmModeKey;
            chrome.storage.sync.get(key, function (res: any) {
                let currentMode: string = res[key];
                let imgName: string = "";
                if(!currentMode || currentMode === "none") {
                    imgName = "red.png";
                } else {
                    imgName = "green.png"
                }
                chrome.browserAction.setIcon({
                    path: '../img/' + imgName
                });
            });
        };
    }
}