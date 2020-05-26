function ToDoListApp() {
    let _this = this;

    let constructor = function () {
        $(".btn_mark_completed").click(function () {
            let toDoItemId = this.dataset.itemid;
            doMarkCompletedRequest(toDoItemId);
        });
    }

    let doMarkCompletedRequest = function (toDoItemId) {
        $.ajax("/Home/MarkCompleted", {
            data: "toDoItemId=" + toDoItemId,
            method: "POST",
            success: function (data, textStatus, jqXHR) {
                console.log("Successfully marked as completed");
                markCompleted(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Failed requesting for item completion");
                console.log("StatusCode: " + jqXHR.status);
                console.log("Message: " + textStatus);
            }
        });
    }

    let markCompleted = function (todo) {
        if (!todo || !todo.id) {
            console.log("failed changing todo state");
            return;
        }

        let toDoItemId = todo.id;
        let toDoPageItem = $(".todo-container[data-itemid=" + toDoItemId + "]");

        toDoPageItem
            .removeClass("bg-dark")
            .addClass("bg-info")
            .find(".todo-container__task").css("text-decoration", "line-through");
        toDoPageItem
            .find("button.todo-container__action-button")
            .unbind("click")
            .click(function () {
                alert("remove")
            })
            .removeClass("btn-primary")
            .addClass("btn-danger")
            .find("i.fa-check")
            .removeClass("fa-check")
            .addClass("fa-trash-alt");

        if (todo.priority === 0) {
            toDoPageItem
                .find(".todo-container__priority")
                .removeClass("text-info")
                .addClass("text-light")
        }
    }

    constructor();
}

$(document).ready(function () {
    let toDoListApp = new ToDoListApp();
});