angular
    .module("app", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/catTareas',{
          templateUrl:'./views/catTareas.html',
          controller:'catTareas',
          controllerAs:'catTar'
        })
        .when('/asignarTareas', {
            controller: 'asignarTareas',
            templateUrl: './views/asignarTareas.html',
            controllerAs:'asiTar'
        })
        .when('/catResponsables', {
            controller: 'catResponsables',
            templateUrl: './views/catResponsables.html',
            controllerAs:'catRes'
        })
        .otherwise({redirectTo:'/catTareas'});
    })

    .run(function($rootScope,$location,$routeParams){
        $rootScope.$on("$locationChangeStart",function(event, next, current){
            next = next.split('?')[0];
            var pag=next.split("/");
            $('.navbar-nav').children().removeClass("active");
            angular.forEach(pag,function(value,key){
                if(value=="catTareas" || value=="asignarTareas" || value=="catResponsables") {
                    $('#' + value).addClass("active");
                    // debugger;
                    // if(next==current && value=='asignarTareas' || value=="catResponsables") {
                    //     event.preventDefault();
                    //     $location.url("/catTareas");
                    // }
                }
            })
        })
    })
    .controller("mainCtrl", function($location) {
        var main = this;
        main.cambiarPag = function(path) {
            $location.path(path);
        }
    })
