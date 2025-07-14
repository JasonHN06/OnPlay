let nombre=document.getElementById("nombre");
let email=document.getElementById("email");
let chkInfo=document.getElementById("chkInfo");
let btnRegistrar=document.getElementById("btnRegistrar");

btnRegistrar.onclick= function(e){
    e.preventDefault();
    creatList();
}

function creatList(){
    console.log(`Email: ${email.value}`);
    console.log(`Nombre: ${nombre.value}`);
    console.log(`Suscrito: ${chkInfo.checked}`);
}