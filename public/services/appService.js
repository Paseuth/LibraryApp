
'use strict';

angular.module('eventApp')

.factory('appService', ['$http','$rootScope',
    function ($http, $rootScope) {
        
        var service = {};

        service.getAllAnnouncements = function(callback){
            if(typeof service.announcements !== "undefined") {
                callback(service.announcements);
            } 
             firebase.database().ref('/announcements/').once('value').then(function(snapshot) {
                var result = snapshot.val();
                service.announcements = [];
                for (var key in result) {
                    result[key].Uid = key;
                    service.announcements.push(result[key]);
                }

                callback(service.announcements);
            });
        };
        
        service.createAnnouncement = function(announcement,callback){
            var uid = firebase.database().ref().child('announcements').push().key;
            firebase.database().ref('announcements/' + uid).set(announcement).then(function(result){
                callback(result);
            });
        }
        return service;
    }
])

 