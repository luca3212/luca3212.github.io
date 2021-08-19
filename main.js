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
    nuevaLi.innerHTML ='<div><input type="checkbox"><p>'+varInput+'</p></div><button id="boton"  onclick = this.parentElement.remove()><svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg></button>';

    const LTareas = document.querySelector("#ListaTareas");

    //LTareas.appendChild(nuevaLi);
    LTareas.insertBefore(nuevaLi, LTareas.firstChild);
}