/* istanbul ignore file */

export {};

declare global {
  interface Window {
    gapi: any;
  }
}

const googleAuth = ((): any => {
  const installClient = () => {
    const apiUrl = 'https://apis.google.com/js/api.js';
    return new Promise<void>((resolve) => {
      const script: any = document.createElement('script');
      script.src = apiUrl;
      script.onreadystatechange = script.onload = () => {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(() => {
            resolve();
          }, 500);
        }
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  };

  const initClient = (config: any) => {
    return new Promise((resolve, reject) => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init(config)
          .then(() => {
            resolve(window.gapi);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    });
  };

  const Auth = function (this: any) {
    this.GoogleAuth = null; /* window.gapi.auth2.getAuthInstance() */
    this.isAuthorized = false;
    this.isInit = false;
    this.prompt = null;
    this.isLoaded = () => {
      // tslint:disable-next-line
      console.warn('isLoaded() will be deprecated. You can use "this.$gAuth.isInit"');
      return !!this.GoogleAuth;
    };

    this.load = (config: any, prompt: string) => {
      installClient()
        .then(() => {
          return initClient(config);
        })
        .then((gapi: any) => {
          this.GoogleAuth = gapi.auth2.getAuthInstance();
          this.isInit = true;
          this.prompt = prompt;
          this.isAuthorized = this.GoogleAuth.isSignedIn.get();
        })
        .catch((error) => {
          console.error(error);
        });
    };

    this.signIn = (successCallback: any, errorCallback: any) => {
      return new Promise((resolve, reject) => {
        if (!this.GoogleAuth) {
          if (typeof errorCallback === 'function') {
            errorCallback(false);
          }
          reject(false);
          return;
        }
        this.GoogleAuth.signIn()
          .then((googleUser: any) => {
            if (typeof successCallback === 'function') {
              successCallback(googleUser);
            }
            this.isAuthorized = this.GoogleAuth.isSignedIn.get();
            resolve(googleUser);
          })
          .catch((error: any) => {
            if (typeof errorCallback === 'function') {
              errorCallback(error);
            }
            reject(error);
          });
      });
    };

    this.getAuthCode = (successCallback: any, errorCallback: any) => {
      return new Promise((resolve, reject) => {
        if (!this.GoogleAuth) {
          if (typeof errorCallback === 'function') {
            errorCallback(false);
          }
          reject(false);
          return;
        }
        this.GoogleAuth.grantOfflineAccess({ prompt: this.prompt })
          .then((resp: any) => {
            if (typeof successCallback === 'function') {
              successCallback(resp.code);
            }
            resolve(resp.code);
          })
          .catch((error: any) => {
            if (typeof errorCallback === 'function') {
              errorCallback(error);
            }
            reject(error);
          });
      });
    };

    this.signOut = (successCallback: any, errorCallback: any) => {
      return new Promise((resolve, reject) => {
        if (!this.GoogleAuth) {
          if (typeof errorCallback === 'function') {
            errorCallback(false);
          }
          reject(false);
          return;
        }
        this.GoogleAuth.signOut()
          .then(() => {
            if (typeof successCallback === 'function') {
              successCallback();
            }
            this.isAuthorized = false;
            resolve(true);
          })
          .catch((error: any) => {
            if (typeof errorCallback === 'function') {
              errorCallback(error);
            }
            reject(error);
          });
      });
    };
  };

  return new (Auth as any)();
})();

export async function installGoogleAuth(options: any): Promise<any> {
  // set config
  let GoogleAuthConfig: any = null;
  const GoogleAuthDefaultConfig = {
    scope: 'profile email',
  };
  let prompt = 'select_account';
  if (typeof options === 'object') {
    GoogleAuthConfig = Object.assign(GoogleAuthDefaultConfig, options);
    if (options.scope) {
      GoogleAuthConfig.scope = options.scope;
    }
    if (options.prompt) {
      prompt = options.prompt;
    }
    if (!options.clientId) {
      // tslint:disable-next-line
      console.warn('clientId is required');
    }
  }
 else {
    // tslint:disable-next-line
    console.warn('invalid option type. Object type accepted only');
  }
  await googleAuth.load(GoogleAuthConfig, prompt);
  return googleAuth;
}
