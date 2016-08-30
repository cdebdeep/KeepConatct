/// <reference path="../typings/index.d.ts" />

namespace ContactApp.Model {
    export class Email implements ngCordova.IEmailComposerOptions {
        to: string | Array<string>;
        cc: string | Array<string>;
        bcc: string | Array<string>;
        attachments: Array<any>;
        subject: string;
        body: string;
        isHtml: boolean;     
    }
}