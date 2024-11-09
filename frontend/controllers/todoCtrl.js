myApp.controller('todocontroller', ["$http", "$state", "api_request", function ($http, $state, api_request) {
    todo = this;
    api_request.authenticate("authenticate", function cb(data) {
        todo.username = data.username
        todo.gettodo();
    })
    todo.todoData = []

    //get todo
    todo.gettodo = function () {
        api_request.responseWithNoData("todo/", function cb(data) {
            todo.todoData = data
        })
    }

    //add todo 
    todo.addTodo = function () {
        console.log(todo.newText, todo.username)
        data = {
            "title": todo.newText,
            "username": todo.username
        }
        api_request.noResponceWithData("POST", "todo/addtodo", data)
        todo.newText=""
    }

    //update todo
    todo.updateTodo = function (id, isDone, todoText) {
        console.log(id, isDone, todoText)
        data = {
            "id": id,
            "task": todoText,
            "isDone": isDone
        }
        api_request.noResponceWithData("PUT", "todo/update/", data)
    }

    //update todo status
    todo.updateTodoStatus = function (id, isDone) {
        console.log(id, isDone)
        data = {
            "id": id,
            "isDone": isDone
        }
        api_request.noResponceWithData("PATCH", "todo/markDone/", data)

    }
    //edit todo
    todo.edit_Text = function (id, isDone, todoText) {
        x = document.getElementById(id);
        edIcon = document.querySelector(`.icons i.edit-${id}`)
        delIcon = document.querySelector(`.icons i.delete-${id}`)
        canIcon = document.querySelector(`.icons i.cancel-${id}`)
        taskvalidate = /^[A-Za-z]{1}[A-Z a-z]{1,15}/.test(x.value);
        console.dir(edIcon)
        if (x.disabled) {
            edIcon.classList.remove("fa-pencil")
            edIcon.classList.add("fa-floppy-disk")
            canIcon.classList.add("fa-xmark")
            delIcon.classList.remove("fa-trash")
            todo.oldtask = x.value;
            x.value = ""
            x.disabled = false
        }
        else if (taskvalidate) {
            x.disabled = true
            todo.updateTodo(id, isDone, x.value)
            edIcon.classList.add("fa-pencil")
            edIcon.classList.remove("fa-floppy-disk")
            canIcon.classList.remove("fa-xmark")
            delIcon.classList.add("fa-trash")
        }
    }
    //cancel edit
    todo.canceledt = function (id) {
        x = document.getElementById(id);
        edIcon = document.querySelector(`.icons i.edit-${id}`)
        delIcon = document.querySelector(`.icons i.delete-${id}`)
        canIcon = document.querySelector(`.icons i.cancel-${id}`)

        x.disabled = true
        x.value = todo.oldtask
        edIcon.classList.add("fa-pencil")
        edIcon.classList.remove("fa-floppy-disk")
        canIcon.classList.remove("fa-xmark")
        delIcon.classList.add("fa-trash")
    }

    //deletetodo
    todo.deleteTodo = function (id) {
        console.log(id)
        data = {
            "id": id,
        }
        api_request.noResponceWithData("POST", "todo/delete/", data)
    }
    //logout
    todo.logout = function () {
        console.log('logout')
        logout = window.confirm("Do you want to logout!!")
        if (logout) {
            var req = {
                method: 'POST',
                url: `${baseURL}/logout/`,
                withCredentials: true,
            }
            $http(req).then(function (responce) {
                console.log(responce)
                $state.go("login")
            }, function (err) {
                console.log(err)
            });
        }
    }
}])
