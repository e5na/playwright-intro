import {expect, Locator, Page} from '@playwright/test'

export class TodoPage {
    readonly page: Page
    readonly todoField: Locator
    readonly todoLabel: Locator;
    readonly editInput: Locator;
    readonly toggle: Locator;
    readonly clearCompletedButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.todoField = page.getByTestId('text-input');
        this.todoLabel = page.getByTestId('todo-item-label');
        this.editInput = page.getByTestId('todo-item').getByTestId('text-input');
        this.toggle = page.getByTestId('todo-item-toggle');
        this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    }

    async open(){
        await this.page.goto('https://todo-app.tallinn-learning.ee/')
    }

    async toggleTask() {
        await this.toggle.click();
    }

    async filterBy(status: 'All' | 'Active' | 'Completed') {
        await this.page.getByRole('link', { name: status }).click();
    }

    async clearCompleted() {
        await this.clearCompletedButton.click();
    }

    async addTask(task: string) {
        await this.todoField.fill(task)
        await this.todoField.press('Enter')
    }

    async addTasks(tasks: string[]) {
        for (const task of tasks) {
            await this.addTask(task);
        }
    }

    async renameTask(oldText: string, newText: string) {
        await this.todoLabel.filter({ hasText: oldText }).dblclick();
        await this.editInput.fill(newText);
        await this.editInput.press('Enter');
    }

    async verifyTaskText(expectedText: string) {
        await expect(this.todoLabel).toHaveText(expectedText);
    }

    async verifyTaskCount(count: number) {
        await expect(this.todoLabel).toHaveCount(count);
    }

}