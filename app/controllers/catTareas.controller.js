angular
    .module("app")
    .controller("catTareas", function(servGral) {
        var catTar = this;

        servGral.getTareas(function(res) {
            catTar.tareas = res;
        });
        
    });
