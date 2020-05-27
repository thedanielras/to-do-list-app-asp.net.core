function ToDoListApp() {
    let _this = this;

    let constructor = function () {
        $(".btn_mark_completed").click(function (e) {
            e.stopPropagation();
            let toDoItemId = this.dataset.itemid;
            doMarkCompletedRequest(toDoItemId);
        });
        $(".btn_remove_todo").click(function (e) {
            e.stopPropagation();
            let toDoItemId = this.dataset.itemid;
            doDeleteToDoItemRequest(toDoItemId);
        });
        $('#edit-todoitem-modal').on('show.bs.modal', function (event) {
            let id = $(event.relatedTarget).data("itemid");
            let task = $(event.relatedTarget)
                .find(".todo-container__task")
            task = task.length ? task[0].innerText : "";
            let priority = $(event.relatedTarget)
                .find(".todo-container__priority")
                .data("priority");

            $(this).find("#edit-todo__id").val(id);
            $(this).find("#edit-todo__task").val(task).focus();
            $(this).find("#edit-todo__priority").val(priority);
        });
    }

    let doMarkCompletedRequest = function (toDoItemId) {
        $.ajax("/Home/MarkCompleted", {
            data: "toDoItemId=" + toDoItemId,
            method: "POST",
            success: function (data) {
                console.log("Successfully marked as completed");
                markCompleted(data);
            },
            error: function (jqXHR, textStatus) {
                console.log("Failed requesting for item completion");
                console.log("StatusCode: " + jqXHR.status);
                console.log("Message: " + textStatus);
            }
        });
    }

    let markCompleted = function (toDoItem) {
        if (!toDoItem || !toDoItem.id) {
            console.log("failed changing todo state");
            return;
        }

        let toDoItemId = toDoItem.id;
        let toDoPageItem = $(".todo-container[data-itemid=" + toDoItemId + "]");

        toDoPageItem
            .removeClass("bg-dark")
            .addClass("bg-info")
            .find(".todo-container__task").css("text-decoration", "line-through");
        toDoPageItem
            .find("button.todo-container__action-button")
            .unbind("click")
            .click(function (e) {
                e.stopPropagation();
                let toDoItemId = this.dataset.itemid;
                doDeleteToDoItemRequest(toDoItemId);
            })
            .removeClass("btn-primary")
            .addClass("btn-danger")
            .find("i.fa-check")
            .removeClass("fa-check")
            .addClass("fa-trash-alt");

        if (toDoItem.priority === 0) {
            toDoPageItem
                .find(".todo-container__priority")
                .removeClass("text-info")
                .addClass("text-light")
        }
    }

    let doDeleteToDoItemRequest = function (toDoItemId) {
        $.ajax("/Home/RemoveToDo", {
            data: "toDoItemId=" + toDoItemId,
            method: "POST",
            success: function (data, textStatus, jqXHR) {
                console.log("Successfully deleted id:" + data.id);
                deleteToDoItemFromPage(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Failed requesting for item deletion");
                console.log("StatusCode: " + jqXHR.status);
                console.log("Message: " + textStatus);
            }
        });
    }

    let deleteToDoItemFromPage = function (toDoItem) {
        if (!toDoItem || !toDoItem.id) {
            console.log("failed changing todo state");
            return;
        }

        let toDoItemId = toDoItem.id;
        let toDoPageItem = $(".todo-container[data-itemid=" + toDoItemId + "]");
        toDoPageItem.css("opacity", "0");
        setTimeout(function () {
            toDoPageItem.remove()
        }, 300);
    }

    constructor();
}

$(document).ready(function () {
    let toDoListApp = new ToDoListApp();
});