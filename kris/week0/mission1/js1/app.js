const input_add = document.querySelector('.input__add');
const added_list = document.querySelector('.todoul--added');
const completed_list = document.querySelector('.todoul--completed');

input_add.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && input_add.value !== '') {
        addTodo(input_add.value.trim());
        input_add.value = '';        
    }
});

function addTodo(text) {
    // li 생성
    const todoli_added = document.createElement('li');
    todoli_added.setAttribute('class', 'todo--added');
    // div 생성
    const tododiv_added = document.createElement('div');
    tododiv_added.setAttribute('class', 'tododiv--added');
    // 버튼 생성
    const completeButton = document.createElement('button');
    completeButton.setAttribute('class', 'button--complete');
    completeButton.setAttribute('onclick', 'buttonClick();');
    completeButton.textContent = '완료';
    // append
    tododiv_added.textContent = text;
    tododiv_added.append(completeButton);
    todoli_added.append(tododiv_added);
    added_list.append(todoli_added);

    completeButton.addEventListener('click', () => {
        if(todoli_added.getAttribute('class') == 'todo--added') {
            completed_list.append(todoli_added);
            completeButton.textContent = '삭제';
            todoli_added.setAttribute('class', 'todo--completed');
        } else if(todoli_added.getAttribute('class') == 'todo--completed') {
            todoli_added.remove();
        }
        
    });
}

function completeTodo() {
    // li 생성
    const todoli_added = document.createElement('li');
    todoli_added.setAttribute('class', 'todo--added');
    // div 생성
    const tododiv_added = document.createElement('div');
    tododiv_added.setAttribute('class', 'tododiv--added');
    // 버튼 생성
    const completeButton = document.createElement('button');
    completeButton.setAttribute('class', 'button--complete');
    completeButton.setAttribute('onclick', 'buttonClick();');
    completeButton.textContent = '완료';
    // append
    tododiv_added.textContent = text;
    tododiv_added.append(completeButton);
    todoli_added.append(tododiv_added);
    added_list.append(todoli_added);

}

function buttonClick() {
    console.log('click');
}