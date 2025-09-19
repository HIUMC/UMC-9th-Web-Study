const input = document.querySelector('#addplan'); /* 입력창 요소 */
const todoList = document.querySelector('#todolist'); /* todoList <ul> */
const doneList = document.querySelector('#donelist'); /* doneList <ul> */

document.addEventListener("keydown", function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
        registerToDo();
    }
});

function registerToDo() {
    const text = input.value.trim(); /* 공백 제거 */
    if (!text) return; /* 빈 입력 방지 */

    const newItem = document.createElement('li'); /* <li> 요소 생성 (새 항목 껍데기) */
    const newText = document.createTextNode(input.value); /* 입력창의 텍스트로 텍스트 노드 생성 */
    newItem.appendChild(newText); /* <li> 껍데기 안에 텍스트 삽입 */

    const doneButton = document.createElement("button"); /* 완료 버튼 생성 */
    doneButton.type = 'button';
    doneButton.textContent = "완료"; /* 버튼 라벨 설정 */
    newItem.appendChild(doneButton); /* <li> 안에 버튼 삽입 */

    const todoList = document.querySelector("#todoList"); 
    todoList.appendChild(newItem); /* <li>를 todo list에 추가 */

    /* 완료 버튼 클릭 시 실행 함수 */
    doneButton.addEventListener("click",function() { 
        doneButton.remove(); /* 완료 버튼 제거 */
        const doneList = document.querySelector("#doneList");
        doneList.appendChild(newItem); /* <li>를 done list로 추가 */

        const deleteButton = document.createElement("button"); /* 삭제 버튼 생성 */
        deleteButton.type = 'button';
        deleteButton.textContent = "삭제"; /* 버튼 라벨 설정 */
        newItem.appendChild(deleteButton); /* <li> 안에 버튼 삽입 */

        /* 삭제 버튼 클릭 시 실행 함수 */
        deleteButton.addEventListener("click",function() {
            newItem.remove(); /* <li> 자체를 제거 */
        });

    });

    input.value=""; /* 입력창 초기화 */
};