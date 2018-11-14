angular
    .module("app")
    .controller("asignarTareas", function(servGral, $location) {
        var asiTar = this;
        servGral.getResponsables(function(res) {
            asiTar.responsables = res;
        });

        servGral.getTareas(function(res) {
            asiTar.tareas = res;
        })

        asiTar.guardar = function(){
            var datos = {
                titulo: asiTar.nomTarea,
                responsable: asiTar.idResponsable._id,
                fechaInicio: formatoFecha(asiTar.fechaInicio),
                fechaFin: formatoFecha(asiTar.fechaFin),
                avance: asiTar.prcAvance,
                categoria: asiTar.nomCategoria
            };
            servGral.saveTarea(datos, function(res) {
                if (res.res) {
                    alert(res.msg);
                    $location.url("/catTareas");
                }else {
                    alert(res.msg);
                }
            });


        }

        function formatoFecha(fecha) {
            var resFecha = fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
            return resFecha;
        }

    })
