let ubi={latitud:null, longitud:null};
TareasJSON = [];

function agregar(){
    
    var nameTarea=document.getElementById("nombreTarea").value;

    if(nameTarea != ""){
        //generamos id para cada elementos de la lista
        var id =  new Date().getTime();
        getUbicacion();     
        const datos = {
            titulo: nameTarea,
            id_tarea: id,
            checkbox: false,
            gps: ubi
        }

        addLista(datos);
        
        TareasJSON.push(datos);

        guardarLocalStorage();
        document.getElementById("nombreTarea").value= "";
    }else{
        alert("Ingrese el nombre de la tarea...");
        document.getElementById("nombreTarea").focus();
        return false;
    }
}

function addLista(data){
    const nuevaLi = document.createElement('li'); // is a node
    nuevaLi.setAttribute("id-lista",data.id_tarea);

    if(data.checkbox==true){
        var check = "checked";
    }

    //nuevaLi.innerHTML ='<div><input type="checkbox"><p>'+varInput+'</p></div><button id="boton"  onclick = this.parentElement.remove()><svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg></button>';
    nuevaLi.innerHTML =`
                <div id="div-text">
                    <input type="checkbox" onclick ="tildeLista(${data.id_tarea})" ${check}>
                    <p>${data.titulo}</p>
                </div>

                <div id="div-botones">
                    <!-- boton copiar -->
                    <button id="boton" class="solo-icono" onclick = "copiarLista(${data.id_tarea})"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z" />
                    </svg></button>

                    <!-- boton compartir -->
                    <button id="boton" class="solo-icono" onclick ="compartirLista(${data.id_tarea})"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08M18 4C18.55 4 19 4.45 19 5S18.55 6 18 6 17 5.55 17 5 17.45 4 18 4M6 13C5.45 13 5 12.55 5 12S5.45 11 6 11 7 11.45 7 12 6.55 13 6 13M18 20C17.45 20 17 19.55 17 19S17.45 18 18 18 19 18.45 19 19 18.55 20 18 20Z" />
                    </svg></button>

                    <!-- boton borrar -->
                    <button id="boton" class="solo-icono" onclick ="deleteLista(${data.id_tarea})"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                    </svg></button>    
                </div>`;
    const LTareas = document.querySelector("#ListaTareas");

    //LTareas.appendChild(nuevaLi); otr forma de agrgarprepend(nuevaLi);
    LTareas.insertBefore(nuevaLi, LTareas.firstChild);
}

//funcion eleminar elementos lista
function deleteLista(idDelete){
    document.querySelector(`[id-lista="${idDelete}"]`).remove();

    TareasJSON = TareasJSON.filter(function(taskElemento) {
        return taskElemento.id_tarea != idDelete; 
    });
    guardarLocalStorage();
}

//cambia el estado del check
function tildeLista(idCheck){
    TareasJSON.map(function(taskElemento){
        if(taskElemento.id_tarea == idCheck){
          if(taskElemento.checkbox==false){
            taskElemento.checkbox = true;
          }else{
            taskElemento.checkbox = false;
          }
        }
    });

    guardarLocalStorage();
}

//funcion pantalla completa
function toggleFullScreen() {
    const BTON = document.querySelector("#botonPC");

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        BTON.innerHTML ='<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" /></svg>';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        BTON.innerHTML = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" /></svg>';
        }
    }
}

//function evento copy
function avisoCopy(){
    console.log('Copiado con exito.');

    const divCopy = document.querySelector("#prueba");
    
    $("#prueba").fadeIn(1500);
    
    setTimeout(function() {
        $("#prueba").fadeOut(1000);
    },1500);

}

//funcion copia nombre de la tarea
function copiarLista(idCopiar) {
    var idl = document.querySelector(`[id-lista="${idCopiar}"]`);
    var text = idl.querySelector("p").textContent;
    //console.log("esto es: "+text);
  
    navigator.clipboard.writeText(text)
      .then(() => {avisoCopy();})
      .catch(err => console.log('Error al copiar el texto.'));
}

//funcion compartir
function compartirLista(idCompartir) {
    var idc = document.querySelector(`[id-lista="${idCompartir}"]`);

    if (!("share" in navigator)) {
      alert('El navegador no es compatible con esta funcion.');
      return;
    }
  
    navigator.share({
        title: 'Tarea guardar en la lista',
        text: 'Titulo de la tarea: '+ idc.querySelector("p").textContent,
        url: document.URL
      })
      .then(() => console.log('El elemento de la lista fue compartido con exito.'))
      .catch(error => console.log('Error al compartir elemento:', error));
}

//obtener ubicacion
function getUbicacion() {
    
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                ubi.latitud = location.coords.latitude;
                ubi.longitud = location.coords.longitude;
            },
            (err) => {
                console.warn(err);
                ubi.latitud = null;
                ubi.longitud = null;
            },
            {
                enableHighAccuracy: false,
                timeout: 1000,
                maximumAge: 0
            }
            
        );
    } else {
        return null;
    }

}

//guardar LocalStorage
function guardarLocalStorage(){
    if('localStorage' in window){
        localStorage.setItem("tareasGuardadas", JSON.stringify(TareasJSON));
        console.log("Tarea Guardada..");
    }else{
        alert("Error al guardar en LocalStorage");
    }
}

//recuperar datos del LocalStorge
function recuperarDatos(){
    if('localStorage' in window){
        return JSON.parse(localStorage.getItem("tareasGuardadas")) || [];
    }else{
        return [];
    }
}

//carga inicial del LocalStorage
window.onload = function () {
    datosLocalStorage = recuperarDatos();

    datosLocalStorage.map((tareaG) => {
        addLista(tareaG);
        TareasJSON.push(tareaG);
    });
};