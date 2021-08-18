
LT = document.getElementById("ListaTareas");

function agregar(){
    
    var nameTarea=document.getElementById("nombreTarea").value;

    if(nameTarea != ""){
        //llama a la function lista
        addLista(nameTarea);
    }else{
        alert("Ingrese el nombre de la tarea...");
        document.getElementById("nombreTarea").focus();
        return false;
    }
}


function addLista(varName){
    var nuevaTarea = document.createElement("li"),
    contenido = document.createTextNode(varName),
    
    inputcheck = document.createElement("input"),
    inputboton = document.createElement("input");

    //Datos del Boton
    inputboton.setAttribute("type","button");
    inputboton.setAttribute("value","BORRAR");
    inputboton.setAttribute("onclick","eliminarTarea()");
    
    //Datos del Checkbox
    inputcheck.setAttribute("type","checkbox");
    //inputcheck.setAttribute("change","tacharTarea");

    //Agremamos las partes de la tarea (Checkbox-Nombre-BotonEliminar)
    nuevaTarea.appendChild(inputcheck);
    nuevaTarea.appendChild(contenido);
    nuevaTarea.appendChild(inputboton);
    //Agregamos la nueva tarea a la lista
    LT.appendChild(nuevaTarea);

    
    document.getElementById("nombreTarea").value = "";
    alert("total de la lista:"+LT.children.length);
    for (var i = 0; i <= LT.children.length -1; i++) {
        LT.children[i].addEventListener("click", function(){
            this.parentNode.removeChild(this);
        });
    }


}


function eliminarTarea(){
    alert("entro al eliminar");
    this.parentNode.removeChild(this);
};

var tacharTarea = function(){
    contenido.style.textDecoration = "line-through";
}

//var checkbox = document.getElementById('test');

//checkbox.addEventListener( 'change', function() {
  //  if(this.checked) {
    //   alert('checkbox esta seleccionado');
   // }
//});

// Borrando Elementos de la lista
//for (var i = 0; i <= LT.children.length -1; i++) {
  //  LT.children[i].addEventListener("click", eleminarTarea);
//}
