/// <reference path="../typings/tsd.d.ts" />
/// <reference path="contactmodel.ts" />
/// <reference path="contactfactory.ts" />
var ContactApp;
(function (ContactApp) {
    var Controller;
    (function (Controller) {
        var ContactController = (function () {
            function ContactController(ContactService) {
                this.myContactService = ContactService;
            }
            ContactController.prototype.Get = function () {
                var _this = this;
                this.myContactService.GetContactCollection().then(function (data) {
                    _this.ContactCollection = data;
                });
            };
            ContactController.prototype.Post = function (newContact) {
                console.log(newContact);
                this.myContactService.PostContact(newContact).then(function (data) {
                    console.log(data);
                });
            };
            ContactController.$inject = ['ContactService'];
            return ContactController;
        })();
        Controller.ContactController = ContactController;
        var starter = angular.module('starter');
        starter.controller('ContactController', ContactApp.Controller.ContactController);
    })(Controller = ContactApp.Controller || (ContactApp.Controller = {}));
})(ContactApp || (ContactApp = {}));
