/// <reference path="../typings/tsd.d.ts" />

namespace ContactApp.Factory {
    export interface IContactService {
        GetCollection(): ng.IPromise<ContactApp.Model.ContactModel[]>;
        Get(email: string): ng.IPromise<ContactApp.Model.ContactModel>;
        Post(contact: ContactApp.Model.ContactModel): ng.IPromise<boolean>
        Put(contact: ContactApp.Model.ContactModel): ng.IPromise<boolean>
        Delete(email: string): ng.IPromise<boolean>
        IsEmailExist(email: string): ng.IPromise<boolean>
    }
    export class ContactService implements IContactService {
        private myQ: ng.IQService;
        private myStorage: any;
        private ContactCollection: ContactApp.Model.ContactModel[];
        constructor($q: ng.IQService, $localStorage: any) {            
            this.myQ = $q;   
            this.myStorage = $localStorage;           
            this.ContactCollection = [];         
            this.myStorage.$default({ ContactCollection: this.ContactCollection }); 
            console.log('Cons Called')      
        }  

        GetCollection(): ng.IPromise<ContactApp.Model.ContactModel[]> {
            var def = this.myQ.defer();
            def.resolve(this.myStorage['ContactCollection']);
            return def.promise;            
        }

        Get(email:string): ng.IPromise<ContactApp.Model.ContactModel> {
            var def = this.myQ.defer();
            this.ContactCollection = this.myStorage['ContactCollection']
            var tempCollection = this.ContactCollection.filter(l => l.Email == email);
            if ((tempCollection != undefined) && (tempCollection.length > 0)) {
                def.resolve(tempCollection[0]);
            } else {
                def.reject('Record not found');
            }             
            return def.promise;
        }

        Post(contact: ContactApp.Model.ContactModel): ng.IPromise<boolean> {
            var def = this.myQ.defer();
            this.myStorage.ContactCollection.push(contact);
            def.resolve(true);
            return def.promise;
        }

        Put(editContact: ContactApp.Model.ContactModel): ng.IPromise<boolean> {
            var recFound = false;
            var def = this.myQ.defer();
            this.ContactCollection = this.myStorage['ContactCollection']
            for (let c of this.ContactCollection) {
                if (c.Email == editContact.Email) {
                    c.Age == editContact.Age;
                    c.CellNumber = editContact.CellNumber;
                    c.FirstName = editContact.FirstName;
                    c.LastName = editContact.LastName;

                    recFound = true;
                    this.myStorage['ContactCollection'] = this.ContactCollection;
                }
            }            
            def.resolve(recFound);
            return def.promise;
        }

        Delete(email: string): ng.IPromise<boolean> {      
            var def = this.myQ.defer();      
            var index = -1
            this.ContactCollection = this.myStorage['ContactCollection'];
            for (var i = 0; i <= this.ContactCollection.length - 1; i++) {
                if (this.ContactCollection[i].Email == email) {
                    index = i;
                }
            }
            if (index >= 0) {
                this.ContactCollection.splice(index, 1);
                this.myStorage['ContactCollection'] = this.ContactCollection;
            }
            def.resolve(index >= 0);
            return def.promise;
        }

        IsEmailExist(email: string): ng.IPromise<boolean> {
            var def = this.myQ.defer();
            this.ContactCollection = this.myStorage['ContactCollection']
            var tempCollection = this.ContactCollection.filter(l => l.Email == email);
            if ((tempCollection != undefined) && (tempCollection.length > 0)) {
                def.resolve(true);
            } else {
                def.resolve(false)
            }
            return def.promise;
        }

        public static GetService($q: ng.IQService, $localStorage: any): IContactService {
            return new ContactService($q, $localStorage);
        }
    }

    var starter = angular.module('starter');
    starter.factory('ContactService', ContactApp.Factory.ContactService.GetService);
}