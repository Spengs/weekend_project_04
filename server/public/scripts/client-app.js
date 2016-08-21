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
      console.log('GET tasks returns:', tasks);
      tasks.forEach(function(task){
        var $el = $('<div></div>');

        var taskProperties = ['task_name', 'task_created_date', 'task_due_date', 'task_info']

        taskProperties.forEach(function(property){
          var $input = $('<input type="text" id="' + property + '"name="' +property + '" />');
          $input.val(task[property]);
          $el.append($input);
        });

        $el.data('taskId', task.id);
        $el.append('<button class="complete">Complete</button>');
        $el.append('<button class="delete">Delete</button>');

        $('#task-container').append($el);
      });
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
  console.log('complete button works');
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
