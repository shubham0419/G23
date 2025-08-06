const form = document.getElementById("task-form");
const todo_container = document.getElementById("todos");

function renderTodo(todos){
  for (let todo of todos){
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.width = "90%";
    div.innerHTML = `<h4>${todo.task}</h4> <div id=${todo._id}>
      <button id="update">${todo.status?"Undo":"Complete"}</button>
      <button id="delete">Delete</button>
    </div>`
    todo_container.prepend(div);
  }
}

async function updateTodo(id){
  let res = await axios.put(`http://localhost:4000/todo/update/${id}`);
}

async function deleteTodo(id){
  let res = await axios.delete(`http://localhost:4000/todo/delete/${id}`);
}
todo_container.addEventListener("click",async (e)=>{
  const btnId = e.target.id;
  // console.log(e.target.parentElement); // return parent of element that is clicked
  const todoId = e.target.parentElement.id;
  if(btnId=="update"){
    updateTodo(todoId);
  }
  if(btnId=="delete"){
    deleteTodo(todoId);
  }
})

form.addEventListener("submit",async (e)=>{
  e.preventDefault();    // to stop reloading of page
  const input = e.target.children[0];
  const text = input.value;
  const res = await axios.post("http://localhost:4000/todo/create",{task:text});
  console.log(res.data);
  input.value = ""
})

async function getAllTodo(){
  let res = await axios.get("http://localhost:4000/todo/all");
  let todos = res.data.todos;
  renderTodo(todos);
}

getAllTodo();

const filtercontainer = document.getElementById("filters");

filtercontainer.addEventListener("click",(e)=>{
  // console.log(e.target.id)
  const btnId = e.target.id;
  const filterBtns = filtercontainer.children;
  if(btnId=="all"){
    e.target.className = "active";
    filterBtns[1].className = "";
    filterBtns[2].className = "";
  }else if(btnId=="active"){
    e.target.className = "active";
    filterBtns[0].className = "";
    filterBtns[2].className = "";
  }else if(btnId=="completed"){
    e.target.className = "active";
    filterBtns[0].className = "";
    filterBtns[1].className = "";
  }
})

