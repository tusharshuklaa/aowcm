namespace AlwaysOnWcm {
  type ModeType = "disabled" | "edit" | "design" | "none";

  interface AowcmElems {
    switch?: string;
    disabled?: string;
    edit?: string;
    design?: string;
  }

  export class WCMMode {
    private wcmModeKey = "always_on_wcm";
    private chrome: any = this.chrome || {};

    constructor() {}

    wcmmode: null;

    get mode(): ModeType {
      if (!this.wcmmode) {
        return this.chrome.storage.sync.get([this.wcmModeKey], function (res) {
          this.wcmmode = res[this.wcmModeKey];
          console.log(`Value is "${ this.wcmmode }"`);
          return this.wcmmode;
        });
      } else {
        return this.wcmmode;
      }
    }

    set mode(name: ModeType) {
      this.chrome.storage.sync.set({
        wcmModeKey: name
      }, function () {
        this.wcmmode = name;
        console.log(`Value is set to "${ this.wcmmode }"`);
      });
    }
  }

  export class Utils {
    constructor() {}

    static $(el: string): Element {
      return document.querySelector(el);
    }

    static UpdateQueryString(key, value, url) {
      if (!url) {
        url = window.location.href;
      }

      const re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi");
      let hash;

      if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
          return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
          hash = url.split('#');
          url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
          if (typeof hash[1] !== 'undefined' && hash[1] !== null)
            url += '#' + hash[1];
          return url;
        }
      } else {
        if (typeof value !== 'undefined' && value !== null) {
          var separator = url.indexOf('?') !== -1 ? '&' : '?';
          hash = url.split('#');
          url = hash[0] + separator + key + '=' + value;
          if (typeof hash[1] !== 'undefined' && hash[1] !== null)
            url += '#' + hash[1];
          return url;
        } else
          return url;
      }
    }
  }

  class AowcmPopup {
    private wcmMode = new AlwaysOnWcm.WCMMode();
    private elems: AowcmElems = {
      switch: "aowcm-always-on",
      disabled: "aowcm-always-disabled",
      edit: "aowcm-always-edit",
      design: "aowcm-always-design"
    };

    constructor() {
      let self = this;
      window.onload = function () {
        self.init();
      };
    }

    public init() {
      let self = this;
      let $ = Utils.$;
      if (!self.wcmMode.mode) {
        self.wcmMode.mode = "none";
        
      }
    }

    private _disableAll(): void {
      let self = this;
      let $ = Utils.$;
      Object.keys(self.elems).forEach((key,index) => {
          if(key !== "switch") {
            $(`#${self.elems[key]}`).setAttribute("disabled", "true");
          }
      });
    }
  }
}