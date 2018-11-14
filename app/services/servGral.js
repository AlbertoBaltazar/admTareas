angular
    .module("app")
    .factory("servGral", function($http) {
        var admServ = {};
        var url = "http://localhost:8080/api/";

        admServ.getResponsables = function(callback) {
            var resultado;
            $http.get(url+"responsables").then(function(res) {
                callback(res.data);
            }, function (err) {
                callback(err);
            });
        }

        admServ.saveResponsable = function(datos,callback) {
            var urlTemp = url + "responsables";
            if (datos.editar) {
                urlTemp = urlTemp + "/" +datos._id
            }
            $http({
                method:((datos.editar) ? 'put' : 'post'),
                url:urlTemp,
                data:datos
            }).then(function(res) {
                callback(res.data);
            }, function(err) {
                callback(err)
            });
        }

        admServ.deleteResponsable = function(datos, callback) {
            var urlTemp = url + "responsables/" + datos._id
            $http.delete(urlTemp).then(function(res) {
                callback(res.data);
            }, function(err) {
                callback(err);
            });
        }

        admServ.saveTarea = function(datos, callback){
            debugger;
            $http.post(url+"tareas").then(function (res) {
                callback(res.data);
            }, function(err) {
                callback(err)
            });
        }

        admServ.getTareas = function(callback) {
            var resultado;
            $http.get(url+"tareas").then(function(res) {
                callback(res.data);
            }, function (err) {
                callback(err);
            });
        }

        return admServ;
    })
