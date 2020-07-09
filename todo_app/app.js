let allTodos;



function createElementFromTodo(todo) {
  const theclass = $('<div class="todo">'),
      titanddue = $("<h3>").append($('<span class="title">').text(todo.title), $('<span class="due-date">').text(todo.dueDate));
      thedescr = $("<pre>").append(todo.description);
      isitdone = $(`<footer class="actions">  ${todo.isComplete ? "" : '<button class="action complete">Complete</button>'}<button class="action delete">Delete</button></footer>`).data("todo", todo);
  return theclass.append(titanddue, thedescr, isitdone), theclass
}

function createTodoFromForm() {

  let form= $('.todo-form');
  const newform = {
      

      title: $(form).find("#todo-title").val(),
      dueDate: $(form).find("#todo-due-date").val(),
      description: $(form).find("#todo-description").val(),
      isComplete: false,
     

   };
   
   return newform

  }


function renderTodos(){
  $("main .content").empty();
  allTodos.forEach(function(todo) {
   if (!todo.isComplete && isCurrent(todo)){
    $(".pending-todos").append(createElementFromTodo(todo).data("todo", todo))
  }
  else if (todo.isComplete){
    $(".completed-todos").append(createElementFromTodo(todo).data("todo", todo))
  
  }else if(!todo.isComplete && !isCurrent(todo)) {
    $(".expired-todos").append(createElementFromTodo(todo).data("todo", todo))


  }
})
}



  function isCurrent(todo) {
    const todoDueDate = new Date(todo.dueDate);
    const now = new Date();
    return now < todoDueDate;
  }



    function storeData() {
      localStorage.setItem("allTodos", JSON.stringify(allTodos))

    };

    function retrieveData() {
      allTodos = JSON.parse(localStorage.getItem("allTodos")) || [
        {
          title: 'Hi Welcome to the TODO app',
          dueDate: '02-13-2029',
          description: 'There are three sections: pending, compelete, and expired. This is under the pending section. Press compete on this pending todo to compelete the todo.  ',
          isComplete: false,
        },
        {
          title: 'Complete',
          dueDate: '02-13-2020',
          description: 'An example of a completed todo. Here in the complete section is all your compelete todo. You can delete them from the delete one by one or use the "remove complete todos" in the sidebar. ',
          isComplete: true,
        },
        {
          title: 'Expired',
          dueDate: '02-13-2020',
          description: 'You can still complete this one, but its already expired. Anything that is passed the current date, will go here. Same as to delete all complete todos, you can use the sidebar or one by one',
          isComplete: false,
        },
      ]

    }
  $(".left-drawer").click(function(todo) {
      $(todo.target).hasClass("left-drawer") && $("#app").toggleClass("drawer-open")
  }); 
      $(".add-todo").click(function() {
      $(".modal").addClass("open")
  });
   $(".remove-completed").click(function() {
      allTodos = allTodos.filter(function(todo) {
          return !todo.isComplete
      }); storeData(), 
          renderTodos()
  }); $(".remove-expired").click(function() {
      allTodos = allTodos.filter(function(todo) {
          return isCurrent(todo)
      }); storeData(),
          renderTodos()
  }); $(".create-todo").click(function(todo) {
      todo.preventDefault();
      const els = $(".todo-form");
      theform = createTodoFromForm(todo);
      allTodos.unshift(theform), els.trigger("reset");
       storeData(), renderTodos(),
       $(".modal").removeClass("open")
  }); $(".cancel-create-todo").click(function(todo) {
      todo.preventDefault();
       $(".modal").removeClass("open")
  }); $("main").on("click", ".action.complete", function() {
      const todo = $(this).closest(".todo");
      todo.data("todo").isComplete = !0, todo.slideUp(function() {
          $(".completed-todos").prepend(todo), todo.find(".action.complete").remove();
           todo.slideDown();
           storeData();
           renderTodos();
      })
  }); 
    $("main").on("click", ".action.complete", function() {
      const todo = $(this).closest(".todo");
      todo.data("todo").isComplete = true 
      todo.slideUp(function() {
          $(".completed-todos").prepend(todo), todo.find(".action.complete").remove(), todo.slideDown();
          storeData(), renderTodos();
      })
  }); $("main").on("click", ".action.delete", function() {
      const todo = $(this).closest(".todo"),
          ele = todo.data("todo");
      todo.slideUp(), allTodos.splice(allTodos.indexOf(ele), 1), 
      storeData(), renderTodos()
  }); retrieveData(), 
      renderTodos();