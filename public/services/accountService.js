'use strict';

angular.module('eventApp')

.factory('accountService', ['$rootScope',
    function ($rootScope) {
        
        var service = {};

        service.currentUser = null;

        service.getCurrentUser_initial = function(callback){
             firebase.auth().onAuthStateChanged(function (user) {
                if (user) { // on initialise si l'utilisateur n'existe pas;
                    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
                        service.currentUser = snapshot.val();
                        service.currentUser.Uid = firebase.auth().currentUser.uid;
                        callback(service.currentUser);
                    });
                }
                else{
                    service.currentUser = null;
                    callback(service.currentUser);
                }
                
            });
        }

        service.login = function(email, password, callback){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
                    service.currentUser = snapshot.val();
                    service.currentUser.uid = firebase.auth().currentUser.uid;
                    callback(service.currentUser);
                });
            })
            .catch(function(error) {
                service.currentUser = null;
                var errorCode = error.code;
                var errorMessage = error.message;
                callback(service.currentUser, "Vos identifiants sont incorrects.");
            });
        }

        service.logout = function(callback){
            firebase.auth().signOut().then(function() {
                service.currentUser = null;
                callback(service.currentUser);
            }, function(error) {
                callback(service.currentUser, error);
            });
        }

        service.createUserWithEmailAndPassword = function(user, callback){
            firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password).then(function(firebaseUser) {
                delete user.Password;
                user.CreationDate = new Date();
                firebase.database().ref('users/' + firebaseUser.uid).set(user).then(function(){
                    service.currentUser = user;
                    service.currentUser.uid = firebaseUser.uid;
                    callback(service.currentUser);
                });
            })
        }

        return service;
    }
])