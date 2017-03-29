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

var xmlDoc = null; //global, para modificarlo y serializarlo (y sacarlo por pantalla)
var xslDoc = null;

window.onload = function(){
//Corregir
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
    inicializar();
   if (comprobar()){
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
    }
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

var xhttp2 = new XMLHttpRequest();
 xhttp2.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   xslDoc=this.responseXML;
  }
 };
 xhttp2.open("GET", "xml/questions.xsl", true);
 xhttp2.send();


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
 xmlDoc = dadesXml.responseXML;





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
 var xpath="/questions/question[@id='jdos_001']/options";
 var nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 ponerDatosRadio(tituloRadio,nodesRadio);
 var nres = xmlDoc.getElementById("jdos_001").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1=xmlDoc.getElementById("jdos_001").getElementsByTagName("answer")[0].innerHTML;
 }
 


 //Radio2 pregunta 2
  var tituloRadio1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var xpath="/questions/question[@id='jdos_002']/options";
 var nodesRadio1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 ponerDatosRadio1(tituloRadio1,nodesRadio1);
 var nres1 = xmlDoc.getElementById("jdos_002").getElementsByTagName('answer').length;
 for (i = 0; i < nres1; i++) { 
  respuestasRadio2=xmlDoc.getElementById("jdos_002").getElementsByTagName("answer")[0].innerHTML;
 }



//SELECT pregunta 7
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var xpath="/questions/question[@id='jdos_007']/options";
 var nodesSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml(tituloSelect,nodesSelect);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[7].innerHTML);
 


 //SELECT2 pregunta 8
 var tituloSelect=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var xpath="/questions/question[@id='jdos_008']/options";
 var nodesSelect1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml1(tituloSelect,nodesSelect1);
 respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[8].innerHTML);
 



 //SELECT MÚLTIPLE pregunta 9
 var tituloSelect=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var xpath="/questions/question[@id='jdos_009']/options";
 var nodesSelectMultiple = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectMultipleHtml(tituloSelect,nodesSelectMultiple);
 var nres = xmlDoc.getElementById("jdos_009").getElementsByTagName('options').length;
 for (i = 0; i < nres; i++){

 respuestasMultiple1=parseInt(xmlDoc.getElementsByTagName("answer")[i].innerHTML);
 //respuestasSelectMultiple9B=parseInt(xmlDoc.getElementsByTagName("answer")[10].innerHTML);
 }



 //SELECT MUÚLTIPLE pregunta 10
 var tituloSelect=xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var xpath="/questions/question[@id='jdos_010']/options";
 var nodesSelectMultiple1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectMultipleHtml1(tituloSelect,nodesSelectMultiple1);
 var nres1 = xmlDoc.getElementById("jdos_010").getElementsByTagName('options').length;
 for (i = 0; i < nres1; i++){
 respuestasMultiple2=parseInt(xmlDoc.getElementsByTagName("answer")[i].innerHTML);
 
 }
 //respuestasSelectMultiple10B=parseInt(xmlDoc.getElementsByTagName("answer")[12].innerHTML);



//CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var xpath="/questions/question[@id='jdos_003']/options";
 var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 ponerDatosCheckboxHtml(tituloCheckbox,nodesCheckbox);
 var nres = xmlDoc.getElementById("jdos_003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("jdos_003").getElementsByTagName("answer")[i].innerHTML;
 }




//CHECKBOX2 pregunta 4
//CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var xpath="/questions/question[@id='jdos_004']/options";
 var nodesCheckbox1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 ponerDatosCheckboxHtml1(tituloCheckbox1,nodesCheckbox1);
 var nres = xmlDoc.getElementById("jdos_004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("jdos_004").getElementsByTagName("answer")[i].innerHTML;
 }

}



//Pregunta 1
function ponerDatosRadio(t,nodes){
 var radioContainer1=document.getElementById('radioDiv');
 document.getElementById('tituloRadio').innerHTML = t;
 var result = nodes.iterateNext();
 i=0;
  while (result) {
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML = result.innerHTML
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;;    
    radioContainer1.appendChild(input);
    radioContainer1.appendChild(label);
    radioContainer1.appendChild(document.createElement("br"));
    var result = nodes.iterateNext();
 }  
}


//Pregunta 2
function ponerDatosRadio1(t,nodes){
 var radioContainer1=document.getElementById('radioDiv1');
 document.getElementById('tituloRadio1').innerHTML = t;
 var result = nodes.iterateNext();
 i=0;
  while (result) {
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML = result.innerHTML
    label.setAttribute("for", "color1_"+i);
    input.type="radio";
    input.name="color1";
    input.id="color1_"+i;;    
    radioContainer1.appendChild(input);
    radioContainer1.appendChild(label);
    radioContainer1.appendChild(document.createElement("br"));
    var result = nodes.iterateNext();
 }  
}




//Pregunta 3
function ponerDatosCheckboxHtml(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var input = document.createElement("input");
   var label = document.createElement("label");   
   label.innerHTML = result.innerHTML
   label.setAttribute("for", "color_"+i);
   input.type="checkbox";
   input.name="color";
   input.id="color_"+i; i++;
   checkboxContainer.appendChild(input);
   checkboxContainer.appendChild(label);
   checkboxContainer.appendChild(document.createElement("br"));
   result = nodes.iterateNext();
  }    
}




//Pregunta 4
function ponerDatosCheckboxHtml1(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var input = document.createElement("input");
   var label = document.createElement("label");   
   label.innerHTML = result.innerHTML
   label.setAttribute("for", "color1_"+i);
   input.type="checkbox";
   input.name="color1";
   input.id="color1_"+i; i++;
   checkboxContainer.appendChild(input);
   checkboxContainer.appendChild(label);
   checkboxContainer.appendChild(document.createElement("br"));
   result = nodes.iterateNext();
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
function ponerDatosSelectHtml(t,nodes){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
  }  
}


//pregunta 8
function ponerDatosSelectHtml1(t,nodes){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
  }  
}


//pregunta 9 
function ponerDatosSelectMultipleHtml(t,nodes){
  document.getElementById("tituloSelectMultiple").innerHTML=t;
  var selectMultiple = document.getElementsByTagName("select")[2];
  var result = nodes.iterateNext();
   i=0;
  	while (result) {
    var option = document.createElement("option");
   option.text = result.innerHTML;
    option.value=i+1;i++;
    selectMultiple.options.add(option);
    result = nodes.iterateNext();
 }  
}


//pregunta 10
function ponerDatosSelectMultipleHtml1(t,nodes){
  document.getElementById("tituloSelectMultiple1").innerHTML=t;
  var selectMultiple = document.getElementsByTagName("select")[3];
  var result = nodes.iterateNext();
   	i=0;
  	while (result) {
    var option = document.createElement("option");
   	option.text = result.innerHTML;
    option.value=i+1;i++;
    selectMultiple.options.add(option);
    result = nodes.iterateNext();
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
   document.getElementById('resultadosDiv').style.display = "block";
   //Código transformación xslt con xmlDoc y xslDoc
   if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);
        resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.getElementById('resultadosDiv').appendChild(resultDocument);
   }
   darRespuestaHtml("Nota: "+ nota +" puntos sobre 10");
   //bloquear formulario (recargar para volver a empezar)
   var f=formElement;
   var e = f.elements;
   for (var i = 0, len = e.length; i < len; ++i) {
    e[i].disabled = true;
   }
}


function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

function corregirInput(){
  
  var s=document.getElementById("num").value;     
  if (s.toLowerCase()== "1995") {
    //darRespuestaHtml("Pregunta 5: ¡correcta!");
    nota +=1;
    darRespuestaHtml("1 punto")
  }else{
    darRespuestaHtmlIncorrecta("0 puntos");
  }
  var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = s;
  xmlDoc.getElementById("jdos_005").appendChild(useranswer);
}

function corregirInput1(){
  
  var s=document.getElementById("num1").value;     
  if (s.toLowerCase()== "1954") {
    //darRespuestaHtml("Pregunta 6: ¡correcta!");
    nota +=1;
  }var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = s;
  xmlDoc.getElementById("jdos_006").appendChild(useranswer);
}

function corregirSelect(){
  
  var sel = document.getElementById("sel").selectedIndex -1;  
  if (sel==respuestaSelect1) { 
   //darRespuestaHtml("Pregunta 7 : ¡correcta!");
   nota +=1;
  }
  var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = sel.selectedIndex;
  xmlDoc.getElementById("jdos_007").appendChild(useranswer);
}
function corregirSelect1(){
  
  var sel = document.getElementById("sel1").selectedIndex -1;  
  if (sel==respuestaSelect2) {

   //darRespuestaHtml("Pregunta 8: ¡correcta!");
   nota +=1;
  }
 var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = sel.selectedIndex;
  xmlDoc.getElementById("jdos_008").appendChild(useranswer);
}


function corregirRadio(){
  var notaRadio = 0;
  var f=formElement;
  var escorrecta = null;
  for (i = 0; i < f.color.length; i++) { 
    if (f.color[i].checked) {
      var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jdos_001").appendChild(useranswer);
      escorrecta=false;   
      if (i==respuestasRadio1) escorrecta=true;
      
      if (escorrecta) {
        notaRadio +=1.0;  
        nota +=1.0;
      }   
    }
  }
  //if (notaRadio != 1){
    //darRespuestaHtmlIncorrecta("Pregunta 1: incorrecta");
  //} else darRespuestaHtml("Pregunta 1: ¡correcta!");
}

function corregirRadio1(){
  var notaRadio = 0;
  var f=formElement;
  var escorrecta = null;
  for (i = 0; i < f.color1.length; i++) {  
    if (f.color1[i].checked) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jdos_002").appendChild(useranswer);
      escorrecta=false;   
      if (i==respuestasRadio2) escorrecta=true;
      
      if (escorrecta) {
        notaRadio +=1.0;  
        nota +=1.0;
      }   
    }
  }
  //if (notaRadio != 1){
    //darRespuestaHtmlIncorrecta("Pregunta 2: incorrecta");
  //} else darRespuestaHtml("Pregunta 2: ¡correcta!");
}





function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var notaCheckbox = 0;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jdos_003").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
    }   
   } 
  }//if(notaCheckbox != 1){
  	//darRespuestaHtmlIncorrecta("Pregunta 3: ¡incorrecta!")
  //}else{
  	//darRespuestaHtml("Pregunta 3: ¡correcta!")
  //}
}

function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var notaCheckbox = 0;
  var escorrecta = [];
  for (i = 0; i < f.color1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color1[i].checked) {
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("jdos_004").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
    }   
   } 
  }//if(notaCheckbox != 1){
  	//darRespuestaHtmlIncorrecta("Pregunta 3: ¡incorrecta!")
  //}else{
  	//darRespuestaHtmlIncorrecta("Pregunta 3: ¡correcta!")
  //}
}




function corregirMultiple(){
  var f = formElement;
  var escorrecta = [];
  var multiple = document.getElementById("multiple");
  var puntuacion = 0;
  for (var i = 0; i<multiple.options.length; i ++){
    if (multiple.options[i].selected){
      var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = i+1;
      xmlDoc.getElementById("jdos_009").appendChild(useranswer);
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
  //if (puntuacion != 1 & puntuacion != 0){
    //darRespuestaHtml("Pregunta 9: " + puntuacion.toFixed(1) + " puntos")
  //} else if (puntuacion == 0){
    //darRespuestaHtmlIncorrecta("Pregunta 9: incorrecta");
  //}else darRespuestaHtml("Pregunta 9: ¡correcta!")
}



function corregirMultiple1(){
  var f = formElement;
  var escorrecta = [];
  var multiple1 = document.getElementById("multiple1");
  var puntuacion = 0;
  for (var i = 0; i<multiple1.options.length; i ++){
    if (multiple1.options[i].selected){
      var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = i+1;
      xmlDoc.getElementById("jdos_010").appendChild(useranswer);
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
  //if (puntuacion != 1 & puntuacion != 0){
    //darRespuestaHtml("Pregunta 10: " + puntuacion.toFixed(1) + " puntos")
  //} else if (puntuacion == 0){
    //darRespuestaHtmlIncorrecta("Pregunta 10: incorrecta");
  //}else darRespuestaHtml("Pregunta 10: ¡correcta!")
}
//Organizar enlaces de la página principal
function ocultarMenu() {
    document.getElementById("contenedorFormulario").style.display="none";
    document.getElementById("myform").style.display="block";
    document.getElementById("resultadosDiv").style.display="none";
    //document.getElementById("instrucciones").style.display="block";
}
function ocultarFormulario(){
    if(comprobar()){
    document.getElementById("myform").style.display="none";
  }
    
}
function ocultarBienvenida() {
    document.getElementById("instrucciones").style.display="none";
    document.getElementById("contenedorFormulario").style.display="block";
    
}

function comprobar(){
   var f=formElement;
   var checked=false;
   var checked2 = false;
   var radioChecked = false;
   var radioChecked2 = false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color1[i].checked) checked=true;
   }
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color1[i].checked) checked2=true;
   }
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color1[i].checked) radioChecked=true;
   }
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) radioChecked2=true;
   }
   if (document.getElementById("num").value =="") {
    //recomendamos focus para input y select "normal", scrollIntoView para el título de select múltiple, radio y checkbox
    document.getElementById("num").focus(); 
    alert("Responde la pregunta 5");
    return false;
   } else if (document.getElementById("num1").value =="") {
    document.getElementById("num").focus();
    alert("Responde la la pregunta 6");
    return false;
   } if (!checked) {
    document.getElementById("tituloCheckbox").scrollIntoView();
    alert("Debes elegir una opción en la 3ª pregunta");
    return false;
   }if (!checked2) {
    document.getElementById("tituloCheckbox1").scrollIntoView();
    alert("Debes elegir una opción en la 4ª pregunta");
    return false;
   } 
   else return true;

}
