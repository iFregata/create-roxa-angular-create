import { Injectable } from '@angular/core';
import { Item } from '@app/models/item';
import {
  getStatusText,
  InMemoryDbService,
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import { delay, Observable, of } from 'rxjs';
import { UserToken } from '../auth/auth-credential';
import { faker } from '@faker-js/faker';

const fakeToken: UserToken = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmMiOiJyb2Nrc3RldmVuQGdtYWlsLmNvbSIsInN1YiI6IkxqSzl2Y0tsTW1OS1lGSGtRR2tqIiwiaXNzIjoiTHEwbkF5c1hyalduVWIzMXI0U2siLCJhdWQiOiJoVXRRczQ1TUFYUmlrRmdxaFZUZCIsInJvbGUiOiJhZG1pbiIsInNjb3BlcyI6WyJ1cm46bWVudTppdGVtcyJdLCJvcmdfdW5pdHMiOlsiaFV0UXM0NU1BWFJpa0ZncWhWVGQiXSwiaWF0IjoxNjU3NjA2NjY0LCJleHAiOjE2NTc2MTM4NjR9.dRsysTS_wpPL9iFMF1stbvpOSsP24Wrg2oee_SPzTfM',
  refresh_token:
    'ZDMq6UNxkUR-7FTRHLXOOWgzhA6fKbofpBiYlvoLna1avxsOCpBtpDyKtqHg91xIK1PeIbce0vl9UclFw0EcFGuUsJVV5m_Mm08GC8oTz3mTFf_z-36h34H3LT_40AG6djQi36r9TPPp4MnfZ5JIDvsjuMJxDVrUtvU88nPeZJEfjhrLr6KjhX2PWbh0HH9POAnhWyChkgmUSQjjPzhpUrG1RmovAOVbdYNWpZiujhRLRVAO4JXBOH55f--wYXVm',
  expires_in: '7200',
  email: 'foo@bar.com',
  user_id: 'LjK9vcKlMmNKYFHkQGkj',
  app_id: 'merchant-console',
};

const userDB = [{ username: 'foo@bar.com', password: 'bar' }];

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  items: Item[];
  constructor() {
    this.items = [];
    for (let i = 0; i < 5; i++) {
      this.items.push({
        id: (i + 1).toString(),
        sn: faker.random.alphaNumeric(7, { casing: 'upper' }),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        epoch_millis: new Date().getTime(),
      });
    }
  }
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> {
    return {};
  }

  get(reqInfo: RequestInfo) {
    const url = reqInfo.url;
    if (url.endsWith('items')) {
      return this.succeedResp(reqInfo, [...this.items]);
    }
    const mathed = url.match(/items\/(?<id>\d+)/);
    if (mathed) {
      const id = mathed.groups!['id'];
      return this.succeedResp(
        reqInfo,
        this.items.find((i) => i.id === id)
      );
    }
    return undefined;
  }

  post(reqInfo: RequestInfo) {
    const url = reqInfo.url;
    if (url.includes('sign-in')) {
      return this.handleSignIn(reqInfo);
    }
    if (url.endsWith('items')) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req);
      const newItem = {
        ...body,
        id: faker.random.numeric(4).toString(),
        epoch_millis: new Date().getTime(),
      };
      // this.items = [...this.items,newItem];
      this.items.push(newItem);
      return this.succeedResp(reqInfo, newItem);
    }
    return undefined; // let the default POST handle all others
  }

  put(reqInfo: RequestInfo) {
    const url = reqInfo.url;
    if (url.endsWith('items')) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req);
      const ix = this.indexOf(body.id);
      if (ix != -1) {
        const newItem = {
          ...body,
          epoch_millis: new Date().getTime(),
        };
        this.items[ix]= newItem;
        return this.succeedResp(reqInfo, newItem);
      }
    }
    return undefined; // let the default POST handle all others
  }

  delete(reqInfo: RequestInfo) {
    const url = reqInfo.url;
    const mathed = url.match(/items\/(?<id>\d+)/);
    if (mathed) {
      const id = mathed.groups!['id'];
      const ix = this.indexOf(id);
      if (ix != -1) {
        //this.items = [...this.items.slice(0,ix),...this.items.slice(ix+1,this.items.length)];
        this.items.splice(ix, 1);
      }
      return this.succeedResp(reqInfo, {
        id: id,
      });
    }
    return undefined;
  }

  protected indexOf(id: string) {
    return this.items.findIndex((item: Item) => item.id === id);
  }

  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    const newUrl = url.replace(/\/v1\/items/, '/items');
    return utils.parseRequestUrl(newUrl);
  }

  private handleSignIn(reqInfo: RequestInfo) {
    const signInBody = reqInfo.utils.getJsonBody(reqInfo.req);
    const { username, password } = signInBody;
    const users = userDB.filter((u) => u.username === username);
    if (users.length === 0) {
      return this.failedResp(reqInfo, 'invalid user', STATUS.UNAUTHORIZED);
    }
    if (users[0].password !== password) {
      return this.failedResp(reqInfo, 'invalid user', STATUS.UNAUTHORIZED);
    }
    return this.succeedResp(reqInfo, fakeToken);
  }

  // responseInterceptor(resOptions:ResponseOptions, reqInfo:RequestInfo):ResponseOptions{
  //   const status =resOptions.status
  //   if(status!==200){
  //     return this.finishOptions(
  //       {
  //         body: {
  //           code: 'FAILED',
  //           messages: {
  //             summary: resOptions.statusText||'Error',
  //           },
  //         },
  //         status: status ? status : STATUS.OK,
  //       },
  //       reqInfo
  //     );
  //   }
  //   const body = resOptions.body;
  //   return this.finishOptions(
  //     {
  //       body: {
  //         code: 'SUCCESS',
  //         payload: body||{},
  //       },
  //       status: STATUS.OK,
  //     },
  //     reqInfo
  //   );
  // }

  private succeedResp(reqInfo: RequestInfo, payload: any) {
    return reqInfo.utils.createResponse$(() => {
      return this.finishOptions(
        {
          body: {
            code: 'SUCCESS',
            payload: payload,
          },
          status: STATUS.OK,
        },
        reqInfo
      );
    });
  }

  private failedResp(reqInfo: RequestInfo, message: string, status?: number) {
    return reqInfo.utils.createResponse$(() => {
      return this.finishOptions(
        {
          body: {
            code: 'FAILED',
            messages: {
              summary: message,
            },
          },
          status: status ? status : STATUS.OK,
        },
        reqInfo
      );
    });
  }

  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = getStatusText(options.status!);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
