export function addTodoService({ todo }) {
    return new Promise((resolve) => {
        setTimeout(
            () => resolve({ todo, success: true }),
            1000
        );
    });
}