$(document).ready(function(){
  getTasks();


  $('#create-task').on('click', 'button', createTask);
  $('#task-container').on('click', '.complete', completeTask);
  $('#task-container').on('click', '.delete', deleteTask);

});


function getTasks(){
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(tasks){
      appendTasks(tasks);
      // console.log('GET tasks returns:', tasks);
      // tasks.forEach(function(task){
      //   var $el = $('<div class="open"></div>');
      //   if(task.completed == true) {
      //     $el = $('<div class="done"></div>')
      //   }
      //       $el.append(task.task_name);
      //       $el.append(task.task_created_date);
      //       $el.append(task.task_due_date);
      //       $el.append(task.task_info);
      //
      //       $el.data('taskId', task.id);
      //       $el.append('<button class="complete">Complete</button>');
      //       $el.append('<button class="delete">Delete</button>');
      //
      //   $('#task-container').append($el);
      // });
    },
    error: function(response){
      console.log('GET /tasks failed');
    },
  })
}


function createTask(){
  event.preventDefault();

  var task = {};

  $.each($('#task-form').serializeArray(), function(i, field){
    task[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: task,
    success: function() {
      console.log('POST works');
      $('#task-container').empty();
      getTasks();
    },
    error: function(response) {
      console.log('POST did not work');
    },
  });
}


function completeTask(){

  var task = {};
  var inputs = ($(this).parent().children().serializeArray());
  $.each(inputs, function(i, field){
    task[field.name] = field.value;
  });
  console.log("task we are putting", task);
  var taskId = ($(this).parent().data('taskId'));

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + taskId,
    data: taskId,
    success: function(){
      $('#task-container').empty();
      getTasks();

    },
    error: function(){
      console.log("error PUT /tasks/" + taskId);
    },
  });
};


function deleteTask(){
  var taskId = $(this).parent().data('taskId');
  var foo = confirm('Are you sure?');

  if(foo == true){
    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + taskId,
      success: function(){
        console.log('DELETE success');
        $('#task-container').empty();
        getTasks();
      },
      error: function(){
        console.log('DELETE failed');
    }
  });
 }
}


function appendTasks(tasks){
  console.log('GET tasks returns:', tasks);
  tasks.forEach(function(task){
    var $el = $('<div class="open"></div>');
    if(task.completed == true) {
      $el = $('<div class="done"></div>')
    }

        console.log(task.task_due_date);
        toString(task.task_due_date);
        console.log(task.task_due_date);
        $el.append('<strong>' + '<u>' + task.task_name + '</u>' + '</strong>' + '<br />');
        // $el.append(task.task_created_date + '<br />');
        // $el.append(task.task_due_date + '<br />');
        // dates don't display because of the gross time section
        $el.append(task.task_info + '<br />');

        $el.data('taskId', task.id);
        $el.append('<button class="complete">Complete</button>');
        $el.append('<button class="delete">Delete</button>');

    $('#task-container').append($el);
  });

}
