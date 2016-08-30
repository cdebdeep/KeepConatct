/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="contactmodel.ts" />
/// <reference path="email.ts" />
/// <reference path="contactfactory.ts" />

namespace ContactApp.Controller {
    export class ContactController {
        private myContactService: ContactApp.Factory.IContactService;
        private ContactCollection: ContactApp.Model.ContactModel[];
        private EditContact: ContactApp.Model.ContactModel; 
        private myEmailComposer:ngCordova.IEmailComposerService;
        static $inject = ['ContactService', '$stateParams', '$state', '$ionicPopup', '$cordovaEmailComposer','$ionicPlatform']

        constructor(ContactService: ContactApp.Factory.IContactService, private $stateParams: any, private $state: any, private $ionicPopup: any, $cordovaEmailComposer: ngCordova.IEmailComposerService, private $ionicPlatform:any) {
            this.myContactService = ContactService;
            this.myEmailComposer = $cordovaEmailComposer;
        }

        GetCollection() {
            this.myContactService.GetCollection().then(data => {
                this.ContactCollection = data;
            });            
        }

        Get() {
            if (typeof this.$stateParams.Email != 'undefined') {
                console.log(this.$stateParams.Email);
                this.myContactService.Get(this.$stateParams.Email).then(data => {
                    this.EditContact = data;
                }).catch(data => {
                    this.$ionicPopup.alert({
                        title: 'Error',
                        template: 'Record not found',
                        cssClass: 'my-custom-error-popup'                        
                    });
                }
                    );
            }
            else {
                this.$ionicPopup.alert({
                    title: 'Error',
                    template: 'Error in loading the record',
                    cssClass: 'my-custom-error-popup'
                });
            }
        }

        Post(New: ContactApp.Model.ContactModel) {  
            var promiseIsEmailExist = this.myContactService.IsEmailExist(New.Email.toString());
            promiseIsEmailExist.then((data) => {
                if (data) {
                    this.$ionicPopup.alert({
                        title: 'Duplicate data',
                        template: 'Email already exist',
                        cssClass: 'my-custom-warning-popup'
                    });
                }
                else {
                    var promiseResult = this.myContactService.Post(New);
                    promiseResult.then((result) => {
                        if (result) {
                            this.$ionicPopup.alert({
                                title: 'Success',
                                template: 'Record saved successfully',
                                cssClass: 'my-custom-success-popup'
                            });
                            this.$state.go('app.search');
                        } else {
                            this.$ionicPopup.alert({
                                title: 'Error',
                                template: 'Record can not be saved',
                                cssClass: 'my-custom-error-popup'
                            });
                        }
                    }).catch(function (err) {
                        console.log(err);
                        this.$ionicPopup.alert({
                            title: 'Error',
                            template: 'Record can not be saved',
                            cssClass: 'my-custom-error-popup'
                        });
                    });    
                }
            });       
                 
        }

        Put(editContact: ContactApp.Model.ContactModel) {
            console.log(editContact);
            var promiseResult = this.myContactService.Put(editContact);

            promiseResult.then((result) =>{
                if (result) {
                    this.$ionicPopup.alert({
                        title: 'Success',
                        template: 'Record saved successfully',
                        cssClass: 'my-custom-success-popup'
                    });
                    this.$state.go('app.search');
                } else {
                    this.$ionicPopup.alert({
                        title: 'Error',
                        template: 'Record can not be saved',
                        cssClass: 'my-custom-error-popup'
                    });
                }
            }).catch(function (err) {
                console.log(err);
                this.$ionicPopup.alert({
                    title: 'Error',
                    template: 'Record can not be saved',
                    cssClass: 'my-custom-error-popup'
                });
            }); 
        }

        Delete(email: string) {            
            var confirm = this.$ionicPopup.confirm({
                title: 'Confirm Delete',
                template: 'Are you sure to delete !',
                cssClass: 'my-custom-warning-popup'
            });
            confirm.then((res) => {
                if (res) {
                    this.myContactService.Delete(email).then(data => {
                        if (data == true) {
                            this.GetCollection();
                            this.$ionicPopup.alert({
                                title: 'Success',
                                template: 'Record deleted successfully',
                                cssClass: 'my-custom-success-popup'
                            });
                        } else {
                            this.$ionicPopup.alert({
                                title: 'Error',
                                template: 'Record can not be deleted',
                                cssClass: 'my-custom-error-popup'
                            });
                        }
                    }).catch(data => console.log(data));
                }
            }); 

        } 

        SendMail(emailAddress: string) {
            
             var email = new ContactApp.Model.Email();
            email.to = emailAddress;
            email.subject = "Test Mail";
            email.body = "Hi, this is a test mail";

            //this.$ionicPlatform.ready(()=>{                                
            //this.myEmailComposer.isAvailable().then(() => {
                
            //}).catch((e) => {
            //    alert(e);
            //    console.log(e);
            //});

            //});

            this.myEmailComposer.open(email).then(() => {
                alert('MailSend');
                console.log('MailSend');
            })





            //var email = new ContactApp.Model.Email();
            //email.to = emailAddress;
            //email.subject = "Test Mail";
            //email.body = "Hi, this is a test mail";
            
            ////this.$cordovaEmailComposer.isAvailable().then(() => {
            //    this.$cordovaEmailComposer.open(email).then((data) => {
            //        console.log(data);
            //    }).catch((error) => {
            //        console.log(error);
            //    });

            ////})
        }       
    }
    var starter = angular.module('starter');
    starter.controller('ContactController', ContactApp.Controller.ContactController);

} 