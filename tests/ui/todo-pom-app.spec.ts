import { test } from '@playwright/test';
import {TodoPage} from "../pages/TodoPage";

test.describe('UI tests for TODO app', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.open();
    });

    test('user can add task', async () => {
        await todoPage.addTask('task 77');
        await todoPage.verifyTaskCount(1);
        await todoPage.verifyTaskText('task 77');
    });

    test('user can add 2 tasks', async () => {
        await todoPage.addTasks(['task 90', 'task 91']);
        await todoPage.verifyTaskCount(2);
    });

    test('user can add a task and rename it', async () => {
        await todoPage.addTask('task 1');
        await todoPage.renameTask('task 1', 'task 4');
        await todoPage.verifyTaskText('task 4');
    });

    test('user can mark task as completed and filter', async () => {
        await todoPage.addTask('task 100');
        await todoPage.toggleTask();

        await todoPage.filterBy('Completed');
        await todoPage.verifyTaskCount(1);

        await todoPage.filterBy('Active');
        await todoPage.verifyTaskCount(0);

        await todoPage.clearCompleted();
        await todoPage.verifyTaskCount(0);
    });
});