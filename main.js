function agregar(){
    
    var nameTarea=document.getElementById("nombreTarea").value;

    if(nameTarea != ""){
        //llama a la function lista
        addLista(nameTarea);
        document.getElementById("nombreTarea").value= "";
    }else{
        alert("Ingrese el nombre de la tarea...");
        document.getElementById("nombreTarea").focus();
        return false;
    }
}


function addLista(varInput){
    const nuevaLi = document.createElement('li'); // is a node
    nuevaLi.innerHTML ='<div><input type="checkbox"><p>'+varInput+'</p></div><input type="button" value="Borrar" id="boton" onclick = this.parentElement.remove()>';

    const LTareas = document.querySelector("#ListaTareas");

    //LTareas.appendChild(nuevaLi);
    LTareas.insertBefore(nuevaLi, LTareas.firstChild);
}