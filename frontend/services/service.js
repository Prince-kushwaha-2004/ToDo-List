myApp.service("api_request",["$http","$state",function($http,$state){
    this.add=function(a,b){
        console.log(a+b)
    }
    this.noResponceWithData=function(method,path,data){
        var req = {
            method: method,
            url: `${baseURL}/${path}`,
            withCredentials:true,
            
            data:data
        }
        $http(req).then(function (response) {
            console.log(response)
            todo.gettodo();
        }, function (err) {
            console.log(err)
            alert(err.data.message)
        });
    }
    this.responseWithNoData=function(path,cb){
        var req = {
            method: 'GET',
            url:`${baseURL}/${path}`,    
            withCredentials: true,
           }
           $http(req).then(function(responce){
            cb(responce.data);
            console.log(todo.todoData)
           }, function(err){
             console.log(err)
           });
    }
    this.authenticate=function(path,cb){
        var req = {
            method: 'GET',
            url:`${baseURL}/${path}`,
            withCredentials: true, 
           }
           $http(req).then(function(responce){
            cb(responce.data);
            console.log(todo.todoData)
           }, function(err){
             console.log(err)
            $state.go("login")
           });
    }
}])

myApp.factory('httpInterceptor', function ($q) {
    var numLoadings = 0;
    return {
        request: function (config) {
            numLoadings++;
            // console.log("loading",numLoadings)
            main.load_start();
            return config || $q.when(config)
        },
        response: function (response) {
            if ((--numLoadings) === 0) {
                // console.log("response recieve",numLoadings)
                main.load_end()
            }
            return response || $q.when(response);
        },
        responseError: function (response) {
            // console.log("error hapens")
            if (!(--numLoadings)) {
                main.load_end()
            }
            return $q.reject(response);
        }
    };
})
myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});



