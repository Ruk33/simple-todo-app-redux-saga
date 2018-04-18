import { get } from "lodash";

/**
 * @param {{todo: string}} params
 */
export function addTodoService(params) {
    return new Promise(resolve => {
        setTimeout(
            () => resolve({ todo: get(params, "todo"), success: true }),
            1000
        );
    });
}
