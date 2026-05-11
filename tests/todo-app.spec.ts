import {expect, Locator, test} from "@playwright/test";

const URL = 'https://todo-app.tallinn-learning.ee/'

test('create a task', async ({ page }) => {
    await page.goto(URL);
    const todoField: Locator = page.getByTestId('text-input')
    await todoField.fill('my first task')
    await todoField.press('Enter')

    const todoTask: Locator = page.getByTestId('todo-item-label')
    await expect(todoTask).toBeVisible()
});

test('create a task and rename it', async ({ page }) => {
    await page.goto(URL);
    const todoField: Locator = page.getByTestId('text-input')
    await todoField.fill('my first task')
    await todoField.press('Enter')
    // Double click to rename item
    const todoTask: Locator = page.getByTestId('todo-item-label')
    await todoTask.dblclick()
    await page.getByTestId('todo-item').getByTestId('text-input').fill('renamed a task')
    await page.getByTestId('todo-item').getByTestId('text-input').press('Enter')
    // Verify that task is renamed
    const text = await todoTask.textContent()
    expect(text).toBe('renamed a task')
});

test('create two tasks and validate filters', async ({ page }) => {
    await page.goto(URL);
    const todoField: Locator = page.getByTestId('text-input')
    // Task 1
    await todoField.fill('my first task')
    await todoField.press('Enter')
    // Task 2
    await todoField.fill('my first task')
    await todoField.press('Enter')
    // Check if there are two tasks in the list
    const todoTasks: Locator = page.getByTestId('todo-item-label')
    await expect(todoTasks).toHaveCount(2)
    // Link for completed tasks
    const completedLink: Locator = page.getByRole('link', {name: 'completed'})
    await completedLink.click()
    await expect(todoTasks).toHaveCount(0)
});

test('create a task and mark as completed', async ({ page }) => {
    await page.goto(URL);
    const todoField: Locator = page.getByTestId('text-input')
    // Task 1
    await todoField.fill('my first task')
    await todoField.press('Enter')
    // Element for tak activation - Toggle
    const toggle: Locator = page.getByTestId('todo-item-toggle')
    await toggle.click()
    // Link for completed tasks
    const completedLink: Locator = page.getByRole('link', {name: 'completed'})
    const todoTasks: Locator = page.getByTestId('todo-item-label')
    await completedLink.click()
    await expect(todoTasks).toHaveCount(1)
    // Link for active tasks
    const activeLink: Locator = page.getByRole('link', {name: 'active'})
    await activeLink.click()
    await expect(todoTasks).toHaveCount(0)
    // Button to clear completed
    const clear: Locator = page.getByRole('button', {name: 'Clear completed'})
    await clear.click()
    await expect(todoTasks).toHaveCount(0)
});