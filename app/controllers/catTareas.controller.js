angular
    .module("app")
    .controller("catTareas", function(servGral, $filter) {
        var catTar = this;
        catTar.mainTareaId = 0;
        catTar.subTareas = {};
        catTar.subTareas.editar = false;
        catTar.fechaActual = new Date();
        servGral.getTareas(function(res) {
            catTar.tareas = res;
        });

        servGral.getResponsables(function(res) {
            catTar.responsables = res;
        });

        // carTar.buscarTareas = function() {
        //     servGral.getTareas(,function(res) {
        //         catTar.tareas = res;
        //     });
        // }

        catTar.cambiarTitulo = function(val, data) {
            if (val == 0) {
                catTar.subTareas.editar = true;
                catTar.subTareas.modalTitle = "Editar Subtarea";
                catTar.subTareas.nomSubTarea = data.nombre;
                catTar.subTareas.idResponsable = "5bede4a896716c51003d5e93";
                catTar.subTareas.fechaFin = new Date(data.fechaFin);
                catTar.subTareas._id = data._id;
            }else {
                catTar.subTareas.editar = false;
                catTar.subTareas.modalTitle = "Agregar Subtarea";
            }
        }

        catTar.obtenerSubtareas = function(datos) {
            catTar.mainTareaId = datos._id;
            servGral.getSubtareas(datos._id, function(res) {
                catTar.subTareas.listado = res;
            });
        }

        catTar.guardarSubTarea = function() {
            var datos = {
                idTareaPadre:catTar.mainTareaId,
                nombre: catTar.subTareas.nomSubTarea,
                responsable: catTar.subTareas.idResponsable.nombre,
                fechaFin:formatoFecha(catTar.subTareas.fechaFin)
            };
            if (catTar.subTareas.editar) {
                datos._id = catTar.subTareas._id;
                datos.editar = true;
            }
            servGral.saveSubTarea(datos, function (res) {
                if (res.res) {
                    alert(res.msg);
                    catTar.cerrarModal();
                    servGral.getSubtareas(catTar.mainTareaId, function(res) {
                        catTar.subTareas.listado = res;
                    });
                }else {
                    alert(res.msg);
                }
            });
        }

        catTar.eliminar = function(datos) {
            servGral.deleteSubtarea({_id:datos._id},function(res) {
                if (res.res) {
                    alert(res.msg);
                    servGral.getSubtareas(catTar.mainTareaId, function(res) {
                        catTar.subTareas.listado = res;
                    });
                }else {
                    alert(res.msg);
                }
            })
        }

        catTar.compararFecha = function(datos) {
            var res = '';
            var dt = new Date(datos.fechaFin);
            if (dt.getTime() < this.fechaActual.getTime()) {
                res = '#ff000087';
            }
            return res;
        }

        catTar.cerrarModal = function() {
            $('#modalSubtareasAgregar').modal('toggle');
        }

        function formatoFecha(fecha) {
            var resFecha = fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
            return resFecha;
        }

    });
