myApp.controller('mycontroller',["$http","$window","$state", function ($http,$window,$state) {
    data=this;
    var req = {
        method: 'GET',
        url:`${baseURL}/authenticate`,    
        withCredentials: true,
       }
       $http(req).then(function(responce){
        $state.go("todo")
       }, function(err){
         console.log(err)
       });

    data.login=function(){
      console.log(data.username,data.password)
      //login user
      if(data.username&&data.password){
        var req = {
          method: 'POST',
          url:`${baseURL}/login`,
          withCredentials:true,
          headers: {
            'Content-Type': "application/json"
        },
          data: {
            "username":data.username,
            "password":data.password
          }
         }
         $http(req).then(function(responce){
          console.log(responce)
          $state.go("todo")
         }, function(err){
           data.errmessage=err.data.message;
           console.log(err)
         });
      }else{
        data.errmessage="enter username and password"
      }
      }
     //create users
    data.signup=function(){
      console.log(data.newName,data.newUsername,data.newPass1,data.newPass2)
      if(data.formvalid){
        if(data.newPass1==data.newPass2){
          var req = {
            method: 'POST',
             url:`${baseURL}/register/`,
            headers: {
              'Content-Type': "application/json"
            },
            data: {
              "name":data.newName,
              "username":data.newUsername,
              "password":data.newPass1,
              "confirmPassword":data.newPass2
          }
          }
           $http(req).then(function(responce){
            console.log(responce)
            data.signuperr="";
            data.signupsuccess="User created successfully!!";
            $window.alert("User created successfully!!")
            $state.go("login")
            signupform.reset()
           }, function(err){
            data.signuperr=err.data.error;
            data.signupsuccess=""
           });
          data.signuperr=""
        }else{
          data.signuperr="Password doesnot match!!"
          data.signupsuccess=""
        }
      }
    }
  }])