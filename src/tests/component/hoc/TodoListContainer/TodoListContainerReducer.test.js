import { reduce } from "lodash";
import { todoListContainerReducer } from "../../../../component/hoc/TodoListContainer/TodoListContainerReducer";
import {
    addTodoSuccess,
    completeTodo,
    setTodoInput,
    incompleteTodo
} from "../../../../component/hoc/TodoListContainer/TodoListContainerAction";

it("must start todo list empty", () => {
    const todoListContainer = todoListContainerReducer();
    expect(todoListContainer.todos.length).toBe(0);
});

it("must add todo to list", () => {
    const newTodo = "write some code";
    const todoListContainer = todoListContainerReducer(
        undefined,
        addTodoSuccess(newTodo)
    );
    const todos = todoListContainer.todos;

    expect(todos.length).toBe(1);
    expect(todos[0].todo).toBe(newTodo);
});

it("must mark todo as completed when completed", () => {
    /**
     * @param {any} state
     * @param {{todo: string, completed: boolean}} todo
     */
    const addTodo = (state, todo) =>
        todoListContainerReducer(state, addTodoSuccess(todo.todo));

    const todos = [
        { todo: "write some todo", completed: false },
        { todo: "play the guitar", completed: false },
        { todo: "add sass to this project", completed: false },
        {
            todo: "slap tl in the nape if he does not come in may",
            completed: false // soon to be true
        }
    ];

    const writeSomeTodo = todos[0];
    const todoListContainerWithWriteTodoCompleted = todoListContainerReducer(
        reduce(todos, addTodo, undefined),
        completeTodo(writeSomeTodo.todo)
    );

    writeSomeTodo.completed = true;
    expect(todoListContainerWithWriteTodoCompleted.todos).toEqual(todos);

    const playGuitarTodo = todos[1];
    const todoListContainerWithWriteTodoAndPlayGuitarCompleted = todoListContainerReducer(
        todoListContainerWithWriteTodoCompleted,
        completeTodo(playGuitarTodo.todo)
    );

    playGuitarTodo.completed = true;
    expect(todoListContainerWithWriteTodoAndPlayGuitarCompleted.todos).toEqual(
        todos
    );
});

it("must mark todo as incompleted when incompleted", () => {
    const newTodo = "write some code";
    const todos = todoListContainerReducer(undefined, addTodoSuccess(newTodo));
    const todosWithNewTodoCompleted = todoListContainerReducer(
        todos,
        completeTodo(newTodo)
    );
    const todosWithNewTodoIncompleted = todoListContainerReducer(
        todosWithNewTodoCompleted,
        incompleteTodo(newTodo)
    ).todos;

    expect(todosWithNewTodoIncompleted[0].completed).toBeFalsy();
});

it("must start todo input as empty text", () => {
    expect(todoListContainerReducer().todo).toBe("");
});

it("must set todo input", () => {
    const todoInput = "writing some todo";
    const todoListContainer = todoListContainerReducer(
        undefined,
        setTodoInput(todoInput)
    );

    expect(todoListContainer.todo).toBe(todoInput);
});
