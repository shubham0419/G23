const form = document.getElementById("task-form");

form.addEventListener("submit",async (e)=>{
  e.preventDefault();    // to stop reloading of page
  const input = e.target.children[0];
  const text = input.value;
  const res = await axios.post("http://localhost:4000/todo/create",{task:text});
  console.log(res.data);
  input.value = ""
})

const todo_container = document.getElementById("todos");
async function getAllTodo(){
  let res = await axios.get("http://localhost:4000/todo/all");
  let todos = res.data.todos;

  for (let todo of todos){
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.width = "90%";
    div.innerHTML = `<h4>${todo.task}</h4> <div>
      <button>${todo.status?"Undo":"Complete"}</button>
      <button>Delete</button>
    </div>`
    todo_container.prepend(div);
  }
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