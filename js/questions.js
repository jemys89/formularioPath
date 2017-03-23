var formElement=null;
var numeroSecreto1=null;
var numeroSecreto2=null;

var respuestaSelect1=null;
var respuestaSelect2=null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var respuestasRadio1=null;
var respuestasRadio2=null;

var respuestasMultiple1= [];
var respuestasMultiple2=[];

var nota = 0.0; 



window.onload = function(){
//Corregir
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
    inicializar();
   //if (comprobar()){
    corregirRadio();
    corregirRadio1();
    corregirCheckbox();
    corregirCheckbox1();
    corregirInput();
    corregirInput1();
    corregirSelect();
    corregirSelect1();
    corregirMultiple();
    corregirMultiple1();
    presentarNota();
    
   return false;
 }


//LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();

 window.onmousedown = function (e) {
    var el = e.target;
    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        // hack to correct buggy behavior
        var select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
}
}




//Gestionar html y xml
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML;





// INPUT NUMBER pregunta 6
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[5].innerHTML;
 ponerDatosInputHtml(tituloInput);
 numeroSecreto2=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);





//INPUT NUMBER pregunta 5
 var tituloInput1=xmlDoc.getElementsByTagName("title")[4].innerHTML;
 ponerDatosInputHtml1(tituloInput1);
 numeroSecreto1=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

 

 //Radio pregunta 1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("jdos_001").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("jdos_001").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosRadio(tituloRadio,opcionesRadio);
 var nres = xmlDoc.getElementById("jdos_001").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1=xmlDoc.getElementById("jdos_001").getElementsByTagName("answer")[0].innerHTML;
 }
 


 //Radio2 pregunta 2
  var tituloRadio1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesRadio1 = [];
 var nopt = xmlDoc.getElementById("jdos_002").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio1[i]=xmlDoc.getElementById("jdos_002").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosRadio1(tituloRadio1,opcionesRadio1);
 var nres1 = xmlDoc.getElementById("jdos_002").getElementsByTagName('answer').length;
 for (i = 0; i < nres1; i++) { 
  respuestasRadio2=xmlDoc.getElementById("jdos_002").getElementsByTagName("answer")[0].innerHTML;
 }



//SELECT pregunta 7
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jdos_007").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jdos_007").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[7].innerHTML);
 


 //SELECT2 pregunta 8
 var tituloSelect=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var opcionesSelect1 = [];
 var nopt = xmlDoc.getElementById("jdos_008").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect1[i] = xmlDoc.getElementById("jdos_008").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelectHtml1(tituloSelect,opcionesSelect1);
 respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[8].innerHTML);
 



 //SELECT MÚLTIPLE pregunta 9
 var tituloSelect=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jdos_009").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jdos_009").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelectMultipleHtml(tituloSelect,opcionesSelect);
 var nres = xmlDoc.getElementById("jdos_009").getElementsByTagName('options').length;
 for (i = 0; i < nres; i++){

 respuestasMultiple1=parseInt(xmlDoc.getElementsByTagName("answer")[i].innerHTML);
 //respuestasSelectMultiple9B=parseInt(xmlDoc.getElementsByTagName("answer")[10].innerHTML);
 }



 //SELECT MUÚLTIPLE pregunta 10
 var tituloSelect=xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jdos_010").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jdos_010").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelectMultipleHtml1(tituloSelect,opcionesSelect);
 var nres1 = xmlDoc.getElementById("jdos_010").getElementsByTagName('options').length;
 for (i = 0; i < nres1; i++){
 respuestasMultiple2=parseInt(xmlDoc.getElementsByTagName("answer")[i].innerHTML);
 
 }
 //respuestasSelectMultiple10B=parseInt(xmlDoc.getElementsByTagName("answer")[12].innerHTML);



//CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("jdos_003").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("jdos_003").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("jdos_003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("jdos_003").getElementsByTagName("answer")[i].innerHTML;
 }




//CHECKBOX2 pregunta 4
//CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("jdos_004").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("jdos_004").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox1,opcionesCheckbox1);
 var nres = xmlDoc.getElementById("jdos_004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("jdos_004").getElementsByTagName("answer")[i].innerHTML;
 }

}



//Pregunta 1
function ponerDatosRadio(t,opt){
 var radioContainer=document.getElementById('radioDiv');
 document.getElementById('tituloRadio').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));
 }  
}



//Pregunta 2
function ponerDatosRadio1(t,opt){
 var radioContainer1=document.getElementById('radioDiv1');
 document.getElementById('tituloRadio1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color1_"+i);
    input.type="radio";
    input.name="color1";
    input.id="color1_"+i;;    
    radioContainer1.appendChild(input);
    radioContainer1.appendChild(label);
    radioContainer1.appendChild(document.createElement("br"));
 }  
}




//Pregunta 3
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer1=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="coler";
    input.id="coler_"+i;;    
    checkboxContainer1.appendChild(input);
    checkboxContainer1.appendChild(label);
    checkboxContainer1.appendChild(document.createElement("br"));
 }  
}



//Pregunta 4
function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "coler1_"+i);
    input.type="checkbox";
    input.name="coler1";
    input.id="coler1_"+i;;   
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}



//Pregunta 5
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}



//Pregunta 6
function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}



//pregunta 7
function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}


//pregunta 8
function ponerDatosSelectHtml1(t,opt){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}


//pregunta 9 
function ponerDatosSelectMultipleHtml(t,opt){
  document.getElementById("tituloSelectMultiple").innerHTML=t;
  var selectMultiple = document.getElementsByTagName("select")[2];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    selectMultiple.options.add(option);
 }  
}


//pregunta 10
function ponerDatosSelectMultipleHtml1(t,opt){
  document.getElementById("tituloSelectMultiple1").innerHTML=t;
  var selectMultiple = document.getElementsByTagName("select")[3];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    selectMultiple.options.add(option);
 }  
}


//Corregir el examen








function darRespuestaHtmlIncorrecta(r){
 var p = document.createElement("span");
 var b = document.createElement("br");
 var node = document.createTextNode(r);
 p.appendChild(node);
 p.appendChild(b);
 document.getElementById('resultadosDiv').appendChild(p);
}



function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}



function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}


function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

function corregirInput(){
  
  var s=document.getElementById("num").value;     
  if (s.toLowerCase()== "1995") {
    darRespuestaHtml("Pregunta 5: ¡correcta!");
    nota +=1;
  }else {
    darRespuestaHtmlIncorrecta(" Pregunta 5: incorrecta");
  }
}

function corregirInput1(){
  
  var s=document.getElementById("num1").value;     
  if (s.toLowerCase()== "1954") {
    darRespuestaHtml("Pregunta 6: ¡correcta!");
    nota +=1;
  }else {
    darRespuestaHtmlIncorrecta(" Pregunta 6: incorrecta");
  }
}

function corregirSelect(){
  
  var sel = document.getElementById("sel").selectedIndex -1;  
  if (sel==respuestaSelect1) { 
   darRespuestaHtml("Pregunta 7 : ¡correcta!");
   nota +=1;
  }
  else darRespuestaHtmlIncorrecta("Pregunta 7: incorrecta");
}
function corregirSelect1(){
  
  var sel = document.getElementById("sel1").selectedIndex -1;  
  if (sel==respuestaSelect2) { 
   darRespuestaHtml("Pregunta 8: ¡correcta!");
   nota +=1;
  }
  else darRespuestaHtmlIncorrecta("Pregunta 8: incorrecta");
}


function corregirRadio(){
  var notaRadio = 0;
  var f=formElement;
  var escorrecta = null;
  for (i = 0; i < f.color.length; i++) { 
    if (f.color[i].checked) {
      escorrecta=false;   
      if (i==respuestasRadio1) escorrecta=true;
      
      if (escorrecta) {
        notaRadio +=1.0;  
        nota +=1.0;
      }   
    }
  }
  if (notaRadio != 1){
    darRespuestaHtmlIncorrecta("Pregunta 1: incorrecta");
  } else darRespuestaHtml("Pregunta 1: ¡correcta!");
}

function corregirRadio1(){
  var notaRadio = 0;
  var f=formElement;
  var escorrecta = null;
  for (i = 0; i < f.color1.length; i++) {  
    if (f.color1[i].checked) {
      escorrecta=false;   
      if (i==respuestasRadio2) escorrecta=true;
      
      if (escorrecta) {
        notaRadio +=1.0;  
        nota +=1.0;
      }   
    }
  }
  if (notaRadio != 1){
    darRespuestaHtmlIncorrecta("Pregunta 2: incorrecta");
  } else darRespuestaHtml("Pregunta 2: ¡correcta!");
}





function corregirCheckbox(){
  var notaCheckbox = 0;
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.coler.length; i++) {  
    if (f.coler[i].checked) {
      escorrecta[i]=false;     
      for (j = 0; j < respuestasCheckbox1.length; j++) {
        if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
      }
      
      if (escorrecta[i]) {
        nota +=1.0/respuestasCheckbox1.length;  
        notaCheckbox +=1.0/respuestasCheckbox1.length;
      } else {
        nota -=1.0/respuestasCheckbox1.length;    
      }   
    }
  }
  if (notaCheckbox != 1){
    darRespuestaHtmlIncorrecta("Pregunta 3: incorrecta" )
  } else darRespuestaHtml("Pregunta 3: ¡correcta!")
  
}

function corregirCheckbox1(){
  var notaCheckbox = 0;
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.coler1.length; i++) {  
    if (f.coler1[i].checked) {
      escorrecta[i]=false;     
      for (j = 0; j < respuestasCheckbox2.length; j++) {
        if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
      }
     
      if (escorrecta[i]) {
        nota +=1.0/respuestasCheckbox2.length;  
        notaCheckbox +=1.0/respuestasCheckbox2.length;
      } else {
        nota -=1.0/respuestasCheckbox2.length;     
      }   
    }
  }
  if (notaCheckbox != 1){
    darRespuestaHtmlIncorrecta("Pregunta 4: incorrecta" )
  } else darRespuestaHtml("Pregunta 4: ¡correcta!")
  
}




function corregirMultiple(){
  var f = formElement;
  var escorrecta = [];
  var multiple = document.getElementById("multiple");
  var puntuacion = 0;
  for (var i = 0; i<multiple.options.length; i ++){
    if (multiple.options[i].selected){
      for (var j = 0; j<respuestasMultiple1.length; j++){
        if (multiple.options[i].value == respuestasMultiple1[j]){
          escorrecta.push(multiple.options[i].value);
        }
      }
    }
  }
  if (escorrecta.length > 0){
    puntuacion = escorrecta.length / respuestasMultiple1.length;
    nota +=puntuacion;
  }
  if (puntuacion != 1 & puntuacion != 0){
    darRespuestaHtml("Pregunta 9: " + puntuacion.toFixed(1) + " puntos")
  } else if (puntuacion == 0){
    darRespuestaHtmlIncorrecta("Pregunta 9: incorrecta");
  }else darRespuestaHtml("Pregunta 9: ¡correcta!")
}



function corregirMultiple1(){
  var f = formElement;
  var escorrecta = [];
  var multiple1 = document.getElementById("multiple1");
  var puntuacion = 0;
  for (var i = 0; i<multiple1.options.length; i ++){
    if (multiple1.options[i].selected){
      for (var j = 0; j<respuestasMultiple1.length; j++){
        if (multiple1.options[i].value == respuestasMultiple2[j]){
          escorrecta.push(multiple1.options[i].value);
        }
      }
    }
  }
  if (escorrecta.length > 0){
    puntuacion = escorrecta.length / respuestasMultiple2.length;
    nota += puntuacion;
  }
  if (puntuacion != 1 & puntuacion != 0){
    darRespuestaHtml("Pregunta 10: " + puntuacion.toFixed(1) + " puntos")
  } else if (puntuacion == 0){
    darRespuestaHtmlIncorrecta("Pregunta 10: incorrecta");
  }else darRespuestaHtml("Pregunta 10: ¡correcta!")
}
//Organizar enlaces de la página principal
function ocultarMenu() {
    document.getElementById("contenedorFormulario").style.display="none";
    document.getElementById("myform").style.display="block";
    document.getElementById("resultadosDiv").style.display="block";
    //document.getElementById("instrucciones").style.display="block";
}
function ocultarFormulario(){
   
    document.getElementById("myform").style.display="none";

    
}
function ocultarBienvenida() {
    document.getElementById("instrucciones").style.display="none";
    document.getElementById("contenedorFormulario").style.display="block";
    
}

