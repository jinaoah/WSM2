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

//급식 API , AJAX 급식데이터 가져오자
//.date-grid-container > .grid-item에 mouseover 이벤트 발생->handler 지정


const handler = (event) => {
    //handler에서 year, month, date 정보를 가져와서 url 생성
    let date = event.target.innerHTML;

    const KEY = "17af9ee1281d48e5983bcde5fe4dab01";

    const ATPT_OFCDC_SC_CODE = "B10" //서울특별시교육청
    const SD_SCHUL_CODE = "7010569" //미림여자정보과학고
    let MLSV_YMD = `${year}${month.toString().padStart(2,"0")}${date.padStart(2,"0")}`;

    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
    url += `?KEY=${KEY}`;
    url += `&Type=json`;
    url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`;
    url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`;
    url += `&MLSV_YMD=${MLSV_YMD}`;

    // console.log(url)
    getMenuByAPI(url)
}
//AJAX로 url 호출
const getMenuByAPI = (url) => {
    //XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    //callback
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
            //success
            console.log('성공');
            // console.log(xhr.response)
            showMenu(xhr.response);
        }
    }
    //요청을 보낼 방식, url, 비동기여부 설정
    xhr.open("GET", url, true);

    //요청 전송
    xhr.send();    
}
const showMenu = (jsonString) => {
    console.log(jsonString);
    //jsonString -> json
    let json = JSON.parse(jsonString); //JSON.stringify() : json -> String
    console.log(json);
    //json -> 조식, 중식, 석식
    let breakfastMenu = "없음"; 
    let lunchMenu = "없음"; 
    let dinnerMenu = "없음"; 
    
    try {
        breakfastMenu = json["mealServiceDietInfo"][1]["row"][0]["DDISH_NM"];
        //메뉴 이름만 나오게 하기(상세사항 삭제)
        //정규표현식
        breakfastMenu = breakfastMenu.replace(/\([0123456789\.]+\)/g,"");
    } catch {    }
    
    try {
        lunchMenu = json["mealServiceDietInfo"][1]["row"][1]["DDISH_NM"];
        lunchMenu = lunchMenu.replace(/\([0-9\.]+\)/g, "");
    } catch {    }
    
    try {
        dinnerMenu = json["mealServiceDietInfo"][1]["row"][2]["DDISH_NM"];
        dinnerMenu = dinnerMenu.replace(/\([0-9\.]+\)/g, "");
    } catch{    }
    //조식 중식, 석식 -> html
    breakfast.innerHTML = breakfastMenu;
    lunch.innerHTML = lunchMenu;
    dinner.innerHTML = dinnerMenu;
}

//응답오면, #breakfast, #lunch, #dinner에 출력
let dateGridContainerDiv = document.getElementsByClassName('date-grid-container')[0];
let gridItems = dateGridContainerDiv.getElementsByClassName('grid-item');

for(let gridItem of gridItems){
    // console.log(gridItem)
    gridItem.onmouseover = handler; //mouseover일 때 이벤트 처리

}