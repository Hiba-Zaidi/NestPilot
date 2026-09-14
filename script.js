   function openFeatures() { var allElems = document.querySelectorAll('.elem');
var allFullElems = document.querySelectorAll('.fullElem');
var allFullElemsBackBtn = document.querySelectorAll('.fullElem .back');
allElems.forEach(function(elem){
    elem.addEventListener('click', function(){

allFullElems[elem.id].style.display='block';

    })
})

allFullElemsBackBtn.forEach(function(back){
back.addEventListener('click', function(){
  
    allFullElems[back.id].style.display='none';
})
})
}
openFeatures();
