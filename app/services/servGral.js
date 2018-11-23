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
            $http({method:'post',url:url+"tareas", data:datos}).then(function (res) {
                callback(res.data);
            }, function(err) {
                callback(err)
            });
        }

        admServ.getTareas = function(callback) {
            $http.get(url+"tareas").then(function(res) {
                callback(res.data);
            }, function (err) {
                callback(err);
            });
        }

        admServ.getSubtareas = function(id, callback) {
            var urlTemp = url + "subtareas/" + id;
            $http.get(urlTemp).then(function (res) {
                callback(res.data);
            }, function (err) {
                callback(err);
            })
        }

        admServ.saveSubTarea = function(datos, callback) {
            var urlTemp = url + "subtareas";
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

        admServ.deleteSubtarea = function(datos, callback) {
            var urlTemp = url + "subtareas/" + datos._id
            $http.delete(urlTemp).then(function(res) {
                callback(res.data);
            }, function(err) {
                callback(err);
            });
        }

        return admServ;
    })
