function agregar(){
    
    var nameTarea=document.getElementById("nombreTarea").value;

    if(nameTarea != ""){
        //generamos id para cada elementos de la lista
        var id =  new Date().getTime();
        //console.log(id);
        //llama a la function lista
        addLista(nameTarea, id);
        document.getElementById("nombreTarea").value= "";
    }else{
        alert("Ingrese el nombre de la tarea...");
        document.getElementById("nombreTarea").focus();
        return false;
    }
}


function addLista(varInput, idli){
    const nuevaLi = document.createElement('li'); // is a node
    nuevaLi.setAttribute("id-lista",idli);
    //nuevaLi.innerHTML ='<div><input type="checkbox"><p>'+varInput+'</p></div><button id="boton"  onclick = this.parentElement.remove()><svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg></button>';
    nuevaLi.innerHTML =`
                <div id="div-text">
                    <input type="checkbox">
                    <p>${varInput}</p>
                </div>

                <div id="div-botones">
                    <!-- boton copiar -->
                    <button id="boton"  onclick = "copiarLista(${idli})"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z" />
                    </svg></button>

                    <!-- boton compartir -->
                    <button id="boton"  onclick ="compartirLista(${idli})"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08M18 4C18.55 4 19 4.45 19 5S18.55 6 18 6 17 5.55 17 5 17.45 4 18 4M6 13C5.45 13 5 12.55 5 12S5.45 11 6 11 7 11.45 7 12 6.55 13 6 13M18 20C17.45 20 17 19.55 17 19S17.45 18 18 18 19 18.45 19 19 18.55 20 18 20Z" />
                    </svg></button>

                    <!-- boton borrar -->
                    <button id="boton"  onclick ="deleteLista(${idli})"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
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


//funcion copia nombre de la tarea
function copiarLista(idCopiar) {
    var idl = document.querySelector(`[id-lista="${idCopiar}"]`);
    var text = idl.querySelector("p").textContent;
  
    //console.log("esto es: "+text);
  
    navigator.clipboard.writeText(text)
      .then(() => {console.log('Copiado con exito.');})
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