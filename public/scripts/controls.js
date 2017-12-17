var app = angular.module('myApp', ['ngStorage']);

app.controller('myCtrl', function($scope,$http,$sessionStorage,$window,$localStorage,$location) {
    var vm = this;
    $scope.data = {};
    
    $localStorage.showDiv;
    $localStorage.shownextDiv;
    $scope.loginvalue = $localStorage.showDiv;
    $scope.logoutvalue = $localStorage.shownextDiv;
    
    $scope.places = $localStorage.rsvpbars;
    
    
    
    function show(storedPlaces){
        storedPlaces.forEach(function(index){
            
            for(var i=0; i<21; i++){
                
                if($scope.VarName.data.businesses[i].id == index){
                    $scope.VarName.data.businesses[i].rsvping = true;
                    $scope.VarName.data.businesses[i].show = true;
                }
            }
        });
    }
    
    
    $scope.preview = function(){
        alert("Submitted!");
    }
    
    $scope.send = function(){
        
        var posting = $http({
            
            method: 'POST',
            url: '/post',
            data: $scope.data,
            processData: true
        }).then(function(response){
            
            $scope.bars = response.data.businesses;

            $window.sessionStorage['storage'] = angular.toJson(response);
            location.reload();
            //$scope.VarName = angular.fromJson(accessData);
            
        }).catch(function(err){
            $scope.bars = err.statusText;
            console.log('Data not recieved');
        });
    }
    
    $scope.myauth = function(){
        
        alert('Want to Authenticate?');
        
        $scope.loginvalue = true;
        $scope.logoutvalue = true;
        $localStorage.showDiv = $scope.loginvalue;
        $localStorage.shownextDiv = $scope.logoutvalue;
        
        $window.location.href = '/auth/github';
    }
    
    $scope.logout = function(){
        alert("Want to Logout?");
        
        $scope.loginvalue = false;
        $scope.logoutvalue = false;
        $localStorage.showDiv = $scope.loginvalue;
        $localStorage.shownextDiv = $scope.logoutvalue;
        
        $window.location.href = '/logout';
        
    }
    
    $scope.rsvp = function(index){
        
        $scope.VarName.data.businesses[index].rsvping = true;
        $scope.VarName.data.businesses[index].show = true;
        
        alert("Bar Id is: "+$scope.VarName.data.businesses[index].id);
        
        var req = $http({
            
            method: 'POST',
            url: '/getlist',
            data: {'index': $scope.VarName.data.businesses[index].id},
            processData: true
        }).then(function(response){
            
            $scope.places = JSON.stringify(response.data.mylist);   //gets data back from /getlist
            $localStorage.rsvpbars = $scope.places;
            if($scope.places) alert("Your RSVPed bars: "+$scope.places);
            
            else alert("Please Login to RSVP!");
            
        }).catch(function(err){
            console.log('List not recieved');
        });
        
        show($scope.places);
    } 
    
    $scope.cancel = function(index){
        
        $scope.VarName.data.businesses[index].rsvping = false;
        $scope.VarName.data.businesses[index].show = false;
        
        var req = $http({
            
            method: 'POST',
            url: '/editlist',
            data: {'index': $scope.VarName.data.businesses[index].id},
            processData: true
        }).then(function(response){
    
            $scope.places = JSON.stringify(response.data.mylist);
            $localStorage.rsvpbars = $scope.places;
            if($scope.places) alert("Your RSVPed bars: "+$scope.places)
            
            else alert("Please Login to RSVP!");

        }).catch(function(err){
            console.log("List not recieved!");
        })
        
       show($scope.places);
    }
    
    
    $scope.VarName = angular.fromJson($window.sessionStorage['storage']);
    
    $scope.myvalues = angular.fromJson($window.sessionStorage['mystorage']);
    
});
