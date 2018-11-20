const todos = JSON.parse(window.localStorage.todos);

// console.log(todos)
const array = []
export function getArray (){
    for(let i=todos.length-1;i>=todos.length-5;i--){
      if(todos[i]!=undefined){
        array.push(todos[i])
      }
    }
    return array
}

// 在这里把他分页
const temp = []
