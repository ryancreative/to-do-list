$(document).ready(function() {

  var currentFilter = 'all'

 var getAndDisplayAllTasks = function() {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=211',
    dataType: 'json',
    success: function(response, textStatus) {
      $('#todo-list').empty();
      
      // Sort tasks by date created
      response.tasks.sort(function(a, b) {
        var dateA = new Date(a.created_at);
        var dateB = new Date(b.created_at);
        return dateB - dateA;
      });
      
      var filteredTasks = response.tasks;

      if (currentFilter === 'complete') {
        filteredTasks = filteredTasks.filter(function(task) {
          return task.completed;
        });
      } else if (currentFilter === 'active') {
        filteredTasks = filteredTasks.filter(function(task) {
          return !task.completed;
        });
      }

      filteredTasks.forEach(function(task) {
        $('#todo-list').append('<div class="row"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '/><p class="item-content">' + task.content + '</p><button type="button" class="delete" data-id="' + task.id + '"><i class="fa-solid fa-circle-minus" style="color: #ff0000;"></i></button></div>');
      });
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};


$('#filter-all').on('click', function() {
  currentFilter = 'all';
  getAndDisplayAllTasks();
});

$('#filter-complete').on('click', function() {
  currentFilter = 'complete';
  getAndDisplayAllTasks();
});

$('#filter-active').on('click', function() {
  currentFilter = 'active';
  getAndDisplayAllTasks();
});


  
  
  var createTask = function() {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=211',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function(response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    
  }

$('#create-task').on('submit', function(e) {
  e.preventDefault();
  createTask();
});

$('.add-task').on('click', function(e) {
  e.preventDefault();
  createTask();
});


  getAndDisplayAllTasks();

  var deleteTask = function(id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=211',
      success: function(response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $(document).on('click', '.delete', function() {
    deleteTask($(this).data('id'))
  });

  $.ajax({
 type: 'PUT',
  url: 'https://fewd-todolist-api.onrender.com/tasks/3372/mark_complete?api_key=211',
  dataType: 'json',
  success: function (response, textStatus) {
    console.log(response);
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});

var markTaskComplete = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=211',
    dataType: 'json',
    success: function(response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

var markTaskActive = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=211',
    dataType: 'json',
    success: function(response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

$(document).on('change', '.mark-complete', function() {
  if (this.checked) {
    markTaskComplete($(this).data('id'));
  } else {
    markTaskActive($(this).data('id'));
  }
});


});