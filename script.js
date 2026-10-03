

function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')
      var mainNav = document.querySelector('#mainNav')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
                mainNav.style.display = 'none'
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
               mainNav.style.display = 'flex'
        })
    })
}

openFeatures()

function todoList() {

    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is Empty');
    }

    function renderTask() {

        var allTask = document.querySelector('.allTask')

        var sum = ''

        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`
        })

        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }
    renderTask()

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()

        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''
    })
}

todoList()
function dailyPlanner(){
var hours = Array.from({length:18},(_,idx)=> `${6+idx}:00 - ${7+idx}:00`)

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}
   var dayPlanner = document.querySelector('.day-planner')

var wholeDaySum = ''

hours.forEach(function (elem, idx) {

    var savedData = dayPlanData[idx] || '';

    wholeDaySum = wholeDaySum + `<div class="daily-planner-time">
        <p>${elem}</p>
        <input id=${idx} type="text" placeholder="..." value="${savedData}">
    </div>`

})

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('clicked');
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
         
        })
    })
}
dailyPlanner()

function motivationalQuote() {
    var motivationalQuoteContent = document.querySelector('.motivation-2 h2')
    var motivationalAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        try {
            let response = await fetch('https://dummyjson.com/quotes/random')
            let data = await response.json()

            motivationalQuoteContent.innerHTML = data.quote
            motivationalAuthor.innerHTML = "- " + data.author

        } catch (error) {
            console.log("Error fetching quote:", error)
        }
    }

    fetchQuote()
}

motivationalQuote()


var pomodoro = document.querySelector('#pomodoro')
var shortBreak = document.querySelector('#shortBreak')
var longBreak = document.querySelector('#longBreak')

pomodoro.addEventListener('click', function () {
    document.body.classList.remove('short-break', 'long-break')
    document.body.classList.add('pomodoro')
})

shortBreak.addEventListener('click', function () {
    document.body.classList.remove('pomodoro', 'long-break')
    document.body.classList.add('short-break')
})

longBreak.addEventListener('click', function () {
    document.body.classList.remove('pomodoro', 'short-break')
    document.body.classList.add('long-break')
})

function pomodoroTimer(){
let timer=document.querySelector('.pomo-timer h1')
var startBtn=document.querySelector('.pomo-timer .start-timer')
var pauseBtn=document.querySelector('.pomo-timer .pause-timer')
var resetBtn=document.querySelector('.pomo-timer .reset-timer')
 var session = document.querySelector('.pomodoro-timer-fullpage .session')
 
var isWorkSession=true
let totalSeconds=25*60
let timerInterval =null
 
  

function updateTimer(){
    let minutes=Math.floor(totalSeconds/60);
    let seconds=totalSeconds%60
  
timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`  
}
function startTimer(){
    clearInterval(timerInterval)
 if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.Color = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        } else {


            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.Color = 'var(--tri4)'
                    totalSeconds = 25 * 60
                }
            }, 1000)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()

    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)


}
pomodoroTimer()

function dailyGoals(){

   const goalsList = document.getElementById("goalsList");
   const completedCount =document.getElementById("completedCount");
    const totalCount = document.getElementById("totalCount");
    const todayScore =document.getElementById("todayScore");
    const totalGoals =document.getElementById("totalGoals");
    const streakCount = document.getElementById("streakCount");
    const sidebarPercentage =document.getElementById("sidebarPercentage");
    const largeProgressFill = document.getElementById("largeProgressFill");
    const progressMessage =document.getElementById("progressMessage");
    const goalSearch =document.getElementById("goalSearch");
    const currentDate =document.getElementById("currentDate");
    const goalModal = document.getElementById("goalModal");
    const openGoalModal =document.getElementById("openGoalModal");
    const closeGoalModal =document.getElementById("closeGoalModal");
    const saveGoal =document.getElementById("saveGoal");
    const newGoalTitle =document.getElementById("newGoalTitle");
    const newGoalCategory =document.getElementById("newGoalCategory");
    const newGoalPriority = document.getElementById("newGoalPriority");
    const newGoalTime = document.getElementById("newGoalTime");
  



const CUSTOM_GOALS_KEY = "customDailyGoals";

function saveCustomGoals() {

    const customRows = document.querySelectorAll(
        '.goal-row[data-custom-goal="true"]'
    );

    const goals = [];

    customRows.forEach(row => {

        goals.push({
            title: row.dataset.title,
            html: row.outerHTML
        });

    });

    localStorage.setItem(
        CUSTOM_GOALS_KEY,
        JSON.stringify(goals)
    );
}


function loadCustomGoals() {

    const savedGoals = JSON.parse(
        localStorage.getItem(CUSTOM_GOALS_KEY)
    ) || [];

    savedGoals.forEach(goal => {

        goalsList.insertAdjacentHTML(
            "beforeend",
            goal.html
        );

    });
}
/*
function loadCustomGoals() {
    const savedGoals =
        JSON.parse(localStorage.getItem(CUSTOM_GOALS_KEY)) || [];

    savedGoals.forEach(goalHTML => {
        goalsList.insertAdjacentHTML(
            "beforeend",
            goalHTML
        );
    });
}
*/



   function displayCurrentDate() {

        const today = new Date();

        const options = {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric"
        };

        currentDate.textContent = today.toLocaleDateString(
                "en-US",
                options
            );
    }

    function getTodayDate() {

        const today = new Date();
        const year =today.getFullYear();

        const month = String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =String(
                today.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    function getYesterdayDate() {

        const yesterday = new Date();

        yesterday.setDate(
            yesterday.getDate() - 1
        );

        const year =yesterday.getFullYear();

        const month = String(
                yesterday.getMonth() + 1
            ).padStart(2, "0");

        const day = String(
                yesterday.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function updateGoalRow(row) {

        const checkbox =row.querySelector(
                ".goal-checkbox"
            );

        const progressText =row.querySelector(
                ".progress-text"
            );

        const progressFill = row.querySelector(
                ".progress-fill"
            );

        const status =row.querySelector(
                ".status"
            );


        if (
            !checkbox ||
            !progressText ||
            !progressFill ||
            !status
        ) {
            return;
        }

        if (
            !row.dataset.progress
        ) {

            row.dataset.progress = progressText.textContent
                    .replace("%", "");

        }

        if (checkbox.checked) {

            row.classList.add(
                "completed"
            );

            progressText.textContent = "100%";
            progressFill.style.width ="100%";
           status.textContent ="Completed";
           status.className ="status completed-status";
}

        else {

            row.classList.remove(
                "completed"
            );


            const originalProgress =row.dataset.progress || "0";


            progressText.textContent =`${originalProgress}%`;

            progressFill.style.width =`${originalProgress}%`;


            if (
                Number(originalProgress) > 0
            ) {

                status.textContent ="In Progress";

                status.className ="status progress-status";

            } else {

                status.textContent = "Pending";

                status.className = "status pending-status";
            }
        }
    }




    function updateGoalStats() {

        const rows =document.querySelectorAll(
                ".goal-row"
            );


        const total = rows.length;


        let completed = 0;

        rows.forEach(row => {

            updateGoalRow(row);


            const checkbox =row.querySelector(
                    ".goal-checkbox"
                );


            if (
                checkbox &&
                checkbox.checked
            ) {

                completed++;

            }

        });


        const percentage =total > 0
                ? Math.round(
                    (completed / total) * 100
                )
                : 0;
        
        completedCount.textContent =completed;
        totalCount.textContent = total;
        todayScore.textContent =`${percentage}%`;
        totalGoals.textContent =total;
      
        /*largeProgressFill.style.width =`${percentage}%`;*/
       /* progressMessage.textContent = `${completed} of ${total} goals completed`;*/
    }



    function getSavedStreak() {

        return parseInt(
            localStorage.getItem(
                "dailyGoalStreak"
            )
        ) || 0;
    }


    function getLastCompletedDate() {

        return localStorage.getItem(
            "lastGoalCompletedDate"
        );
    }




    function displayStreak() {

        let streak =getSavedStreak();
        const lastCompleted =getLastCompletedDate();
        const today = getTodayDate();
        const yesterday =getYesterdayDate();


       
    
        if (
            lastCompleted &&
            lastCompleted !== today &&
            lastCompleted !== yesterday
        ) {

            streak = 0;

            localStorage.setItem(
                "dailyGoalStreak",
                "0"
            );
        }


        streakCount.textContent = streak;
    }




    function updateStreak() {

    const today =getTodayDate();
    const yesterday =getYesterdayDate();
    let streak =getSavedStreak();
    const lastCompleted =getLastCompletedDate();


       

        if (
            lastCompleted === today
        ) {

            streakCount.textContent =streak;
            return;
        }


       
        if (!lastCompleted) {

            streak = 1;
        }

        else if (
            lastCompleted === yesterday
        ) {

            streak++;
        }


     

        else {

            streak = 1;
        }

        localStorage.setItem(
            "dailyGoalStreak",
            streak
        );


        localStorage.setItem(
            "lastGoalCompletedDate",
            today
        );


        streakCount.textContent =streak;
    }



    function checkDailyCompletion() {

        const rows =document.querySelectorAll(
                ".goal-row"
            );


        if (
            rows.length === 0
        ) {
            return;
        }


        let completed = 0;


        rows.forEach(row => {

            const checkbox = row.querySelector(
                    ".goal-checkbox"
                );


            if (
                checkbox &&
                checkbox.checked
            ) {

                completed++;

            }

        });

        if (
            completed === rows.length
        ) {

            updateStreak();
        }
    }

    goalsList.addEventListener(
        "change",
        function (event) {

            if (
                !event.target.classList.contains(
                    "goal-checkbox"
                )
            ) {
                return;
            }


            updateGoalStats();

            checkDailyCompletion();
        }
    );

    goalsList.addEventListener(
        "click",
        function (event) {

            const deleteButton =event.target.closest(
                    ".delete-btn"
                );


            if (!deleteButton) {
                return;
            }


            const row =deleteButton.closest(
                    ".goal-row"
                );


            if (!row) {
                return;
            }


            row.remove();
saveCustomGoals();
            updateGoalStats();
        }
    );

    function searchGoals() {

        const searchValue =  goalSearch.value
                .toLowerCase()
                .trim();


        const rows =document.querySelectorAll(
                ".goal-row"
            );


        rows.forEach(row => {

            const title =
                (
                    row.dataset.title || ""
                ).toLowerCase();


            if (
                title.includes(
                    searchValue
                )
            ) {

                row.style.display =
                    "grid";
            } else {

                row.style.display =
                    "none";
            }
        });
    }


    goalSearch.addEventListener(
        "input",
        searchGoals
    );

    openGoalModal.addEventListener(
        "click",
        function () {

            goalModal.classList.add(
                "active"
            );

            newGoalTitle.focus();
        }
    );

    function closeModal() {

        goalModal.classList.remove(
            "active"
        );
    }


    closeGoalModal.addEventListener(
        "click",
        closeModal
    );

    goalModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === goalModal
            ) {

                closeModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                goalModal.classList.contains(
                    "active"
                )
            ) {

                closeModal();
            }
        }
    );

    saveGoal.addEventListener(
        "click",
        function () {

            const title =newGoalTitle.value.trim();
            const category =newGoalCategory.value;
            const priority = newGoalPriority.value;
            const targetTime = newGoalTime.value.trim();

            if (!title) {

                alert(
                    "Please enter a goal."
                );

                newGoalTitle.focus();

                return;
            }

            const categoryClass =
                category.toLowerCase();

            const priorityClass = priority.toLowerCase();


            const row = document.createElement(
                    "div"
                );


            row.className = "goal-row";


            row.dataset.title = title;


            row.dataset.progress = "0";
            row.dataset.customGoal = "true";

            row.innerHTML = `<div class="goal-name">

                    <input
                        type="checkbox"
                        class="goal-checkbox"
                    >

                    <span>
                        ${title}
                    </span>

                </div>


                <div>

                    <span
                        class="category ${categoryClass}"
                    >
                        ${category}
                    </span>

                </div>


                <div>

                    <span
                        class="priority ${priorityClass}"
                    >
                        ${priority}
                    </span>

                </div>


                <div class="progress-column">

                    <div class="progress-text">
                        0%
                    </div>

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: 0%"
                        ></div>

                    </div>

                </div>


                <div class="target-time">
                    ${targetTime || "By EOD"}
                </div>


                <div>

                    <span
                        class="status pending-status"
                    >
                        Pending
                    </span>

                </div>


                <div class="goal-actions">

                    <button
                        class="delete-btn"
                        type="button"
                        aria-label="Delete goal"
                    >
                        🗑
                    </button>

                </div>

            `;


            goalsList.appendChild(
                row
            );
           
            newGoalTitle.value = "";

            newGoalTime.value = "";

            closeModal();

            updateGoalStats();
            saveCustomGoals();
            searchGoals();
        }
    );

    displayCurrentDate();
    loadCustomGoals();
    updateGoalStats();

    displayStreak();

}
dailyGoals();

   
function weatherFunctionality(){
var apiKey = 'KEY'; /*I have removed API key for security purpose*/
var city = 'Saharanpur';

async function weatherAPICall() {

    var response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    var data = await response.json();

    var temperature = document.querySelector('#temperature');
    var condition = document.querySelector('#condition');
    var precipitation = document.querySelector('#precipitation');
    var humidity = document.querySelector('#humidity');
    var wind = document.querySelector('#wind');

    temperature.innerHTML = `${data.current.temp_c}°C`;
    condition.innerHTML = `${data.current.condition.text}`;
    precipitation.innerHTML = `Precipitation: ${data.current.precip_mm} mm`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
}

weatherAPICall();


    function timeDate() {

    var date = new Date();

    var tarik = date.toLocaleDateString('en-US', {
        weekday: 'long'
    });

    var month = date.toLocaleDateString('en-US', {
        month: 'short'
    });

    var day = date.getDate();

    var year = date.getFullYear();
 var time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    var header1Date = document.querySelector('#currentDate');

    if (header1Date) {
        header1Date.innerHTML =`${tarik}, ${month} ${day}, ${year} | ${time}`;
    } 
    
}

timeDate();

setInterval(timeDate, 60000);


}
weatherFunctionality()

function changeTheme() {

    var theme = document.querySelector('.theme')
       if (!theme) return;

    var rootElement = document.documentElement;

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#093C5D')
            rootElement.style.setProperty('--sec', '#7AAACE')
            rootElement.style.setProperty('--tri1', '#95BDD7')
             rootElement.style.setProperty('--tri2', '#ABD2FA')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#601D49')
            rootElement.style.setProperty('--sec', '#BD5579')
            rootElement.style.setProperty('--tri1', '#EA9D9D')
            rootElement.style.setProperty('--tri2', '#FFEBB8')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#2C3639')
            rootElement.style.setProperty('--sec', '#3F4E4F')
            rootElement.style.setProperty('--tri1', '#A27B5C')
            rootElement.style.setProperty('--tri2', '#D1EDD3')
            flag = 3
        }

        else if (flag == 3) {
            rootElement.style.setProperty('--pri', '#4F5B2A')
            rootElement.style.setProperty('--sec', '#89A482')
            rootElement.style.setProperty('--tri1', '#ACC5A6')
            rootElement.style.setProperty('--tri2', '#D1EDD3')
            flag = 0
        }

    })


}

changeTheme()