//routing...
myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    user=sessionStorage.getItem('user');
    $urlRouterProvider.otherwise("/login")
    
    var signupState = {
      name: 'signup',
      url: '/signup',
      templateUrl: './views/signup.html',
      controller:"mycontroller as data"
    
    }
    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: './views/login.html',
      controller:"mycontroller as data"
    }
    var todoState = {
      name: 'todo',
      url: '/todo',
      templateUrl: './views/home.html',
      controller:"todocontroller as todo"
    }
  
    $stateProvider.state(signupState);
    $stateProvider.state(loginState);
    $stateProvider.state(todoState);
  });