//현재 구하기
let now = new Date();

//현재 년
let year = now.getFullYear();
//현재 월
let month = now.getMonth(); //0~11
month ++;

const setCalendar = (year, month) => {
    //1일에 해당하는 요일
    let firstDate = new Date(year, month-1, 1); 
    let firstDay = firstDate.getDay();


    //말일 며칠
    let lastDate = new Date(year, month, 0).getDate(); //2022년10월0일 -> 2022년9월말일


    //제목 표시
    const setTitle = (year, month) => {
        // console.log(`${year}년 ${month}월`)
        // let title_year = document.getElementById("title_year");
        title_year.innerHTML = year;

        // let title_month = document.getElementById("title_month");
        title_month.innerHTML = month;
    }

    setTitle(year, month);

    const dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
    dateGridContainerDiv.innerHTML = "";
    //1~말일까지 grid-item
    for (let i=1; i<=lastDate; i++) {
        let newDiv = document.createElement("div");
        
        //class에 grid-item 넣기
        newDiv.classList.add("grid-item");
        
        //text에 숫자 넣기
        newDiv.innerHTML = i;

        //부모에 newDiv 달기
        dateGridContainerDiv.appendChild(newDiv);
    }

    //1일에 해당하는 div를 grid-column-start: 요일+1;
    let firstDateDiv = dateGridContainerDiv.getElementsByClassName("grid-item")[0]
    firstDateDiv.style.gridColumnStart = firstDay + 1;
}
setCalendar(year, month);

//이전 달력으로 전환
const prevMonth = () => {
    if (month==1) {
        year--;
        month = 12;
    } else {
        month--;
    }
    setCalendar(year, month);
}
//다음 달력으로 전환
const nextMonth = () => {
    if (month==12) {
        year++;
        month = 1;
    } else {
        month++;        
    }
    setCalendar(year, month);
}

const initButton = () => {

    //js event 리스너
    // prev-btn.addEventListener('click', prevMonth);
    // next-btn.addEventListener('click', nextMonth);
    prev_btn.onclick = prevMonth;
    next_btn.onclick = nextMonth;
}

initButton();