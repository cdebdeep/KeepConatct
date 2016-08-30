/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="email.ts" />

namespace ContactApp.Controller {
    export class HomeController {
        private myEmailComposer: ngCordova.IEmailComposerService;
        emailAddress: string;

        static $inject = ['$stateParams', '$state', '$ionicPopup', '$cordovaEmailComposer', '$ionicPlatform']
        
        constructor(private $stateParams: any, private $state: any, private $ionicPopup: any, $cordovaEmailComposer: ngCordova.IEmailComposerService, private $ionicPlatform: any) {
            this.myEmailComposer = $cordovaEmailComposer;            
            this.emailAddress = "luciusstella@gmail.com";      
        }

          
       
        SendMail() {
        
            var email = new ContactApp.Model.Email();
            email.to = this.emailAddress;
            email.subject = "Test Mail";
            email.body = "Hi, this is a test mail";         

            this.myEmailComposer.open(email).then(() => {
                alert('MailSend');
                console.log('MailSend');
            })
            
        }    
    }

    var starter = angular.module('starter');
    starter.controller('HomeController', ContactApp.Controller.HomeController);
}

