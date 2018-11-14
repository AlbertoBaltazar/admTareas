angular
    .module("app")
    .controller("catResponsables", function(servGral) {
        var catRes = this;
        catRes.editar = false;
        catRes.responsables = {};

        servGral.getResponsables(function(res) {
            catRes.responsables = res;
        });

        catRes.cambiarTitulo = function(val,data) {
            if (val == 0) {
                catRes.editar = true;
                catRes.modalTitle = "Editar Responsable";
                catRes.nombreResp = data.nombre;
                catRes._id = data._id;
            }else {
                catRes.editar = false;
                catRes.modalTitle = "Agregar Responsable";
            }
        }

        catRes.guardar = function() {
            var datos = {nombre:catRes.nombreResp}
            if (catRes.editar) {
                datos._id = catRes._id;
                datos.editar = true;
            }
            servGral.saveResponsable(datos, function(res) {
                if (res.res) {
                    alert(res.msg);
                    catRes.cerrarModal();
                    servGral.getResponsables(function(res) {
                        catRes.responsables = res;
                    });
                }else {
                    alert(res.msg);
                }
            });
        }

        catRes.borrar = function(datos) {
            servGral.deleteResponsable({_id:datos._id},function(res) {
                if (res.res) {
                    alert(res.msg);
                    servGral.getResponsables(function(res) {
                        catRes.responsables = res;
                    });
                }else {
                    alert(res.msg);
                }
            })
        }

        catRes.cerrarModal = function() {
            catRes.nombreResp = "";
            catRes._id = null;
            $('#modalResponsables').modal('toggle');
        }

    });
