var loadFile = function(event) {
   var reader = new FileReader();
   reader.onload = function(){
     var output = document.getElementById('output');
     output.style.display = 'inline-block';
     output.src = reader.result;
   };
   reader.readAsDataURL(event.target.files[0]);
 };

window.onload = function(){

   function showPrompt(text, callback) {
     var form = document.getElementById('prompt-form');
     var container = document.getElementById('prompt-form-container');
     document.getElementById('prompt-message').innerHTML = text;
     form.elements.text.value = '';

     function complete(value) {
       container.style.display = 'none';
       document.onkeydown = null;
       callback(value);
     }

     form.onsubmit = function() {
       var value = form.elements.text.value;
       if (value == '') return false;
       complete(value);
       return false;
     };

     form.elements.cancel.onclick = function(e) {
        e.preventDefault();
        complete(null);
     };

     document.onkeydown = function(e) {
       if (e.keyCode == 27) { // escape
         return false;
       }
     };

     var lastElem = form.elements[form.elements.length - 1];
     var firstElem = form.elements[0];

     lastElem.onkeydown = function(e) {
       if (e.keyCode == 9 && !e.shiftKey) {
         firstElem.focus();
         return false;
       }
     };

     firstElem.onkeydown = function(e) {
       if (e.keyCode == 9 && e.shiftKey) {
         lastElem.focus();
         return false;
       }
     };
     container.style.display = 'block';
     form.elements.text.focus();
   }

   document.getElementById('output').onclick = function() {
     showPrompt("Add your note", function(value) {
       var node = document.createElement('li');
       var textnode = document.createTextNode(value);
       node.appendChild(textnode);
       document.getElementById('notes').appendChild(node);
     });
   };

   var addTag = function(){
   addEventListener("click", function(event) {
       var tag = document.createElement("img");
       tag.src = "img/noteActive.png";
       tag.className = "tag";
       document.body.appendChild(tag);
       tag.style.left = (event.clientX-tag.clientWidth/2) + "px";
       tag.style.top = (event.clientY-tag.clientHeight/2) + "px";
     });
   };
  };
