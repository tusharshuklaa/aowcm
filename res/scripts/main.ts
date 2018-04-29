namespace AlwaysOnWcm {
    interface StringValidator { }
  
    export class WCMMode {
      private wcmModeKey = "always_on_wcm";
      private chrome: any = this.chrome || {};
  
      constructor() {}
  
      get mode():string {
        return this.chrome.storage.sync.get([this.wcmModeKey], function(res) {
          return res[this.wcmModeKey];
        });
      }
  
      set mode(name: string) {
        this.chrome.storage.sync.set({wcmModeKey: name}, function() {
          console.log('Value is set to ' + name);
        });
      }
    }

    class Popup {
        private wcmMode = new AlwaysOnWcm.WCMMode();

        constructor() {}

        private init() {
            let self = this;
            let mode = self.wcmMode.mode;
            if(!mode) {
                
            }
        }
    }
}

