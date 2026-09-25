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

let form=document.querySelector('.addTask form');
let taskInput=document.querySelector('.addTask form input');
let taskDetailInput=document.querySelector('.addTask form textarea');
let taskCheckbox=document.querySelector('.addTask form #check');

var currTask = [];

if (localStorage.getItem('currTask')) {
   currTask = JSON.parse(localStorage.getItem('currTask'));
    //console.log('Tasks loaded:', currTask);
} else {
    console.log('No tasks found');
   // localStorage.setItem('currTask', JSON.stringify(currTask));
}



function renderTask(){
    var allTask = document.querySelector('.allTask');

var sum = '';

currTask.forEach(function(elem) {
    sum = sum + `
        <div class="task">
            <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
            <button>Mark as Completed</button>
        </div>
    `;
});

allTask.innerHTML = sum;

completeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        btn.classList.add('completed');
        btn.innerText = 'Completed ✓';
    });
});
console.log(sum);

}renderTask();

form.addEventListener('submit', function(e) {
 e.preventDefault();

    currTask.push({
        task: taskInput.value,
        details: taskDetailInput.value,
        imp: taskCheckbox.checked,
          completed: false
    });

    localStorage.setItem('currTask', JSON.stringify(currTask));
    taskInput.value = '';
    taskDetailInput.value = '';
    taskCheckbox.checked = false;
     renderTask();
});


var markCompletedBtn=document.querySelectorAll('.task button')
markCompletedBtn.forEach(function(btn){
    btn.addEventListener('click',function(){
 console.log(markCompletedBtn);
    })
})
