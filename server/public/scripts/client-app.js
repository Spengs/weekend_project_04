$(document).ready(function(){
  getTasks();


  $('#create-task').on('click', 'button', createTask);
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
