// Select Elements 

const form=document.getElementById("todoform");
const todoInput=document.getElementById("newtodo");
const todoListEl=document.getElementById("todos-list");
const notificationEl=document.querySelector(".notification");

//VARS

let todos=JSON.parse(localStorage.getItem('todos')) || [];
let editing=-1;


// First Time Rendering

renderToDo();

//Form Submit

form.addEventListener('submit',function(event){
event.preventDefault();

saveTodo();
renderToDo();
localStorage.setItem("todos",JSON.stringify(todos));
});

//SAVE TODO

function saveTodo(){
    const todoValue=todoInput.value;
// check if todo is empty
const isEmpty=todoValue==='';

//check for duplicate element

const isDuplicate=todos.some((todo)=>{ return todo.value.toUpperCase()===todoValue.toUpperCase()})


if(isEmpty){
    // alert("Todos input is empty");
    showNotification("Empty Todo");
}
else if(isDuplicate){
    showNotification("Duplicate Todo");
}
else{


  if(editing>=0){
        let newArr=todos.map((todo,index)=>{
            if(index===editing){
                return {
                    value:todoInput.value,
                    color:todo.color,
                    checked:todo.checked
                }
            }
            else{
                return todo
            }
        })
        todos=newArr;
        editing=-1;
    }


    else{
        const todo={
    value:todoValue,
    checked:false,
    color:'#'+Math.floor(Math.random()*16777215).toString(16)

}
    
todos.push(todo);
    }
// console.log(todos);
// dollar is used to fetch the real feild in string and the string should use ``
todoInput.value='';
}

}
// Function Render ToDo


function renderToDo(){
if(todos.length===0){
    todoListEl.innerHTML='<center>Nothing to do!</center>'
    return ;
}
    
    //Clear Element Before a Re-render
    todoListEl.innerHTML=''; 

    //Rebder TODOS
    todos.forEach((todo,index)=>{
    todoListEl.innerHTML+=
    // const newTodo=todos.map()
   ` <div class="todo" id=${index}>
    <i class="bi ${(todo.checked)?'bi-check-circle-fill' :'bi-circle'}"
    style ="color: ${todo.color}"
    data-action="check"
    >
    </i>
    <p class="${todo.checked ? 'checked':''}" data-action="check">${todo.value}</p>
    <i class="bi bi-pencil-square" data-action="edit"></i>
    <i class="bi bi-trash" data-action="delete"></i>
    
</div>`
}

    )
}

//Click Event Listener for all the todos
todoListEl.addEventListener('click',(event)=>{
const target=event.target;
const parentElement=target.parentNode;

if(parentElement.className!== 'todo'){return;}
const todo=parentElement;
const todoId=Number(todo.id) ;
//console.log(todoId);

const action=target.dataset.action;
//console.log(action);
if(action==="check"){
    checkTodo(todoId);
}
else if(action==="edit"){
    editTodo(todoId);
}
else if(action==="delete"){
    deleteTodo(todoId);
}



// console.log(target,parentElement);

})


//CHECK  TODO
function checkTodo(todoId){
    let newArr=todos.map((todo,index)=>{
        if(index===todoId){
            return {
                value:todo.value,
                color:todo.color,
                checked:!todo.checked
            }
        }
        else{
            return todo
        }
    })
    todos=newArr;
    //console.log(todos)
    renderToDo();
    localStorage.setItem("todos",JSON.stringify(todos));
}


//EDIT TODO
function editTodo(todoId){
    todoInput.value=todos[todoId].value;
    editing=todoId;

}

// DELETE TODO

function deleteTodo(todoId){
let newArr=todos.filter((todo,index)=>{
    return index!==todoId;
})
editing=-1;
todos=newArr;
renderToDo();
localStorage.setItem("todos",JSON.stringify(todos));

}



//  SHOW A NOTIFICATION

function showNotification(msg){
    //change the message of 
notificationEl.innerHTML=msg;

// notification enter
notificationEl.classList.add('notif-enter');

// notification leave
setTimeout(()=>{
    notificationEl.classList.remove('notif-enter')
},2000)
}