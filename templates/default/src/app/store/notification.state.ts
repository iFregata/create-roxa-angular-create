import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const STATE_TOKEN = new StateToken<any>('notification');

export class NotifySuccess {
  static readonly type = '[Notification UX] RaiseSuccess';
  constructor(public title: string, public content: string) {}
}

export class NotifyInfo {
  static readonly type = '[Notification UX] RaiseInfo';
  constructor(public title: string, public content: string) {}
}

export class NotifyWarning {
  static readonly type = '[Notification UX] RaiseWarning';
  constructor(public title: string, public content: string) {}
}

export class NotifyError {
  static readonly type = '[Notification UX] RaiseError';
  constructor(public title: string, public content: string) {}
}

@State({
  name: STATE_TOKEN,
})
@Injectable()
export class NotificationState {
  constructor(private notification: NzNotificationService) {}

  @Action(NotifySuccess)
  notifySuccess(ctx: StateContext<any>, { title, content }: NotifySuccess) {
    this.notification.create('success', title, content, { nzDuration: 2500 });
  }
  @Action(NotifyInfo)
  notifyInfo(ctx: StateContext<any>, { title, content }: NotifyInfo) {
    this.notification.create('info', title, content, { nzDuration: 2500 });
  }
  @Action(NotifyWarning)
  notifyWarning(ctx: StateContext<any>, { title, content }: NotifyWarning) {
    this.notification.create('warning', title, content, { nzDuration: 2500 });
  }
  @Action(NotifyError)
  notifyError(ctx: StateContext<any>, { title, content }: NotifyError) {
    this.notification.create('error', title, content, { nzDuration: 2500 });
  }
}
