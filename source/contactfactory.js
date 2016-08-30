/// <reference path="../typings/tsd.d.ts" />
var ContactApp;
(function (ContactApp) {
    var Factory;
    (function (Factory) {
        var ContactService = (function () {
            function ContactService($q, $localStorage) {
                this.myQ = $q;
                this.myStorage = $localStorage;
                var contact = new ContactApp.Model.ContactModel();
                contact.Email = 'cdebdeep@gmail.com';
                this.ContactCollection = [];
                this.ContactCollection.push(contact);
                this.myStorage.$default({ ContactCollection: this.ContactCollection });
            }
            ContactService.prototype.GetContactCollection = function () {
                var def = this.myQ.defer();
                def.resolve(this.myStorage['ContactCollection']);
                return def.promise;
            };
            ContactService.prototype.PostContact = function (contact) {
                var def = this.myQ.defer();
                this.ContactCollection.push(contact);
                def.resolve(true);
                return def.promise;
            };
            ContactService.GetContactService = function ($q, $localStorage) {
                return new ContactService($q, $localStorage);
            };
            return ContactService;
        })();
        Factory.ContactService = ContactService;
        var starter = angular.module('starter');
        starter.factory('ContactService', ContactApp.Factory.ContactService.GetContactService);
    })(Factory = ContactApp.Factory || (ContactApp.Factory = {}));
})(ContactApp || (ContactApp = {}));
