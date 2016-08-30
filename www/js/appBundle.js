// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngStorage', 'ngCordova'])
    .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
        //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //  cordova.plugins.Keyboard.disableScroll(true);
        //  }
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
    .config(function ($provide) {
    $provide.decorator('$state', function ($delegate, $stateParams) {
        $delegate.forceReload = function () {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });
})
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
        .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html'
            }
        }
    })
        .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })
        .state('app.ContactNew', {
        url: '/ContactNew',
        views: {
            'menuContent': {
                templateUrl: 'templates/ContactNew.html'
            }
        }
    })
        .state('app.ContactEdit', {
        url: '/ContactEdit',
        params: {
            Email: null
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/ContactEdit.html'
            }
        }
    })
        .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })
        .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlists.html',
                controller: 'PlaylistsCtrl'
            }
        }
    })
        .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    // Form data for the login modal
    $scope.loginData = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };
    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})
    .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})
    .controller('PlaylistCtrl', function ($scope, $stateParams) {
});
var ContactApp;
(function (ContactApp) {
    var Model;
    (function (Model) {
        var ContactModel = (function () {
            function ContactModel() {
            }
            return ContactModel;
        }());
        Model.ContactModel = ContactModel;
    })(Model = ContactApp.Model || (ContactApp.Model = {}));
})(ContactApp || (ContactApp = {}));
/// <reference path="../typings/tsd.d.ts" />
var ContactApp;
(function (ContactApp) {
    var Factory;
    (function (Factory) {
        var ContactService = (function () {
            function ContactService($q, $localStorage) {
                this.myQ = $q;
                this.myStorage = $localStorage;
                this.ContactCollection = [];
                this.myStorage.$default({ ContactCollection: this.ContactCollection });
                console.log('Cons Called');
            }
            ContactService.prototype.GetCollection = function () {
                var def = this.myQ.defer();
                def.resolve(this.myStorage['ContactCollection']);
                return def.promise;
            };
            ContactService.prototype.Get = function (email) {
                var def = this.myQ.defer();
                this.ContactCollection = this.myStorage['ContactCollection'];
                var tempCollection = this.ContactCollection.filter(function (l) { return l.Email == email; });
                if ((tempCollection != undefined) && (tempCollection.length > 0)) {
                    def.resolve(tempCollection[0]);
                }
                else {
                    def.reject('Record not found');
                }
                return def.promise;
            };
            ContactService.prototype.Post = function (contact) {
                var def = this.myQ.defer();
                this.myStorage.ContactCollection.push(contact);
                def.resolve(true);
                return def.promise;
            };
            ContactService.prototype.Put = function (editContact) {
                var recFound = false;
                var def = this.myQ.defer();
                this.ContactCollection = this.myStorage['ContactCollection'];
                for (var _i = 0, _a = this.ContactCollection; _i < _a.length; _i++) {
                    var c = _a[_i];
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
            };
            ContactService.prototype.Delete = function (email) {
                var def = this.myQ.defer();
                var index = -1;
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
            };
            ContactService.prototype.IsEmailExist = function (email) {
                var def = this.myQ.defer();
                this.ContactCollection = this.myStorage['ContactCollection'];
                var tempCollection = this.ContactCollection.filter(function (l) { return l.Email == email; });
                if ((tempCollection != undefined) && (tempCollection.length > 0)) {
                    def.resolve(true);
                }
                else {
                    def.resolve(false);
                }
                return def.promise;
            };
            ContactService.GetService = function ($q, $localStorage) {
                return new ContactService($q, $localStorage);
            };
            return ContactService;
        }());
        Factory.ContactService = ContactService;
        var starter = angular.module('starter');
        starter.factory('ContactService', ContactApp.Factory.ContactService.GetService);
    })(Factory = ContactApp.Factory || (ContactApp.Factory = {}));
})(ContactApp || (ContactApp = {}));
/// <reference path="../typings/index.d.ts" />
var ContactApp;
(function (ContactApp) {
    var Model;
    (function (Model) {
        var Email = (function () {
            function Email() {
            }
            return Email;
        }());
        Model.Email = Email;
    })(Model = ContactApp.Model || (ContactApp.Model = {}));
})(ContactApp || (ContactApp = {}));
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="contactmodel.ts" />
/// <reference path="email.ts" />
/// <reference path="contactfactory.ts" />
var ContactApp;
(function (ContactApp) {
    var Controller;
    (function (Controller) {
        var ContactController = (function () {
            function ContactController(ContactService, $stateParams, $state, $ionicPopup, $cordovaEmailComposer, $ionicPlatform) {
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.$ionicPopup = $ionicPopup;
                this.$ionicPlatform = $ionicPlatform;
                this.myContactService = ContactService;
                this.myEmailComposer = $cordovaEmailComposer;
            }
            ContactController.prototype.GetCollection = function () {
                var _this = this;
                this.myContactService.GetCollection().then(function (data) {
                    _this.ContactCollection = data;
                });
            };
            ContactController.prototype.Get = function () {
                var _this = this;
                if (typeof this.$stateParams.Email != 'undefined') {
                    console.log(this.$stateParams.Email);
                    this.myContactService.Get(this.$stateParams.Email).then(function (data) {
                        _this.EditContact = data;
                    }).catch(function (data) {
                        _this.$ionicPopup.alert({
                            title: 'Error',
                            template: 'Record not found',
                            cssClass: 'my-custom-error-popup'
                        });
                    });
                }
                else {
                    this.$ionicPopup.alert({
                        title: 'Error',
                        template: 'Error in loading the record',
                        cssClass: 'my-custom-error-popup'
                    });
                }
            };
            ContactController.prototype.Post = function (New) {
                var _this = this;
                var promiseIsEmailExist = this.myContactService.IsEmailExist(New.Email.toString());
                promiseIsEmailExist.then(function (data) {
                    if (data) {
                        _this.$ionicPopup.alert({
                            title: 'Duplicate data',
                            template: 'Email already exist',
                            cssClass: 'my-custom-warning-popup'
                        });
                    }
                    else {
                        var promiseResult = _this.myContactService.Post(New);
                        promiseResult.then(function (result) {
                            if (result) {
                                _this.$ionicPopup.alert({
                                    title: 'Success',
                                    template: 'Record saved successfully',
                                    cssClass: 'my-custom-success-popup'
                                });
                                _this.$state.go('app.search');
                            }
                            else {
                                _this.$ionicPopup.alert({
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
            };
            ContactController.prototype.Put = function (editContact) {
                var _this = this;
                console.log(editContact);
                var promiseResult = this.myContactService.Put(editContact);
                promiseResult.then(function (result) {
                    if (result) {
                        _this.$ionicPopup.alert({
                            title: 'Success',
                            template: 'Record saved successfully',
                            cssClass: 'my-custom-success-popup'
                        });
                        _this.$state.go('app.search');
                    }
                    else {
                        _this.$ionicPopup.alert({
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
            };
            ContactController.prototype.Delete = function (email) {
                var _this = this;
                var confirm = this.$ionicPopup.confirm({
                    title: 'Confirm Delete',
                    template: 'Are you sure to delete !',
                    cssClass: 'my-custom-warning-popup'
                });
                confirm.then(function (res) {
                    if (res) {
                        _this.myContactService.Delete(email).then(function (data) {
                            if (data == true) {
                                _this.GetCollection();
                                _this.$ionicPopup.alert({
                                    title: 'Success',
                                    template: 'Record deleted successfully',
                                    cssClass: 'my-custom-success-popup'
                                });
                            }
                            else {
                                _this.$ionicPopup.alert({
                                    title: 'Error',
                                    template: 'Record can not be deleted',
                                    cssClass: 'my-custom-error-popup'
                                });
                            }
                        }).catch(function (data) { return console.log(data); });
                    }
                });
            };
            ContactController.prototype.SendMail = function (emailAddress) {
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
                this.myEmailComposer.open(email).then(function () {
                    alert('MailSend');
                    console.log('MailSend');
                });
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
            };
            ContactController.$inject = ['ContactService', '$stateParams', '$state', '$ionicPopup', '$cordovaEmailComposer', '$ionicPlatform'];
            return ContactController;
        }());
        Controller.ContactController = ContactController;
        var starter = angular.module('starter');
        starter.controller('ContactController', ContactApp.Controller.ContactController);
    })(Controller = ContactApp.Controller || (ContactApp.Controller = {}));
})(ContactApp || (ContactApp = {}));
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="email.ts" />
var ContactApp;
(function (ContactApp) {
    var Controller;
    (function (Controller) {
        var HomeController = (function () {
            function HomeController($stateParams, $state, $ionicPopup, $cordovaEmailComposer, $ionicPlatform) {
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.$ionicPopup = $ionicPopup;
                this.$ionicPlatform = $ionicPlatform;
                this.myEmailComposer = $cordovaEmailComposer;
                this.emailAddress = "luciusstella@gmail.com";
            }
            HomeController.prototype.SendMail = function () {
                var email = new ContactApp.Model.Email();
                email.to = this.emailAddress;
                email.subject = "Test Mail";
                email.body = "Hi, this is a test mail";
                this.myEmailComposer.open(email).then(function () {
                    alert('MailSend');
                    console.log('MailSend');
                });
            };
            HomeController.$inject = ['$stateParams', '$state', '$ionicPopup', '$cordovaEmailComposer', '$ionicPlatform'];
            return HomeController;
        }());
        Controller.HomeController = HomeController;
        var starter = angular.module('starter');
        starter.controller('HomeController', ContactApp.Controller.HomeController);
    })(Controller = ContactApp.Controller || (ContactApp.Controller = {}));
})(ContactApp || (ContactApp = {}));
//# sourceMappingURL=appBundle.js.map