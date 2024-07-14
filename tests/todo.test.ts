import {
  expect,
  test
} from '@playwright/test'

import { allure } from "allure-playwright"

import { TodoPage } from '../pages/todoPage'
import { baseURL } from '../playwright.config'

test.describe('UI tests LGC challenge Nélia Rodrigues', () => {
  allure.feature('Todo app tests')

  let todoPage: TodoPage

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page)

    await page.goto(baseURL)
  })

  test('User can add items to Todo list', async ({ page }) => {
    allure.story('User can add items to Todo list')

    await expect(page).toHaveURL(baseURL)

    const currentDate = todoPage.getCurrentDate()
    const todayTodo = 'TODO 1 - ' + currentDate

    await todoPage.addItemInput.fill(todayTodo)
    await todoPage.addItemInput.press('Enter')

    await expect(todoPage.addedItemList).toContainText(todayTodo)
  })

  test('User can mark a todo item as completed', async () => {
    allure.story('User can mark a todo item as completed')

    const { todayTodo } = await todoPage.addItems()

    const todayTodoItem = todoPage.addedItemContainer.filter({ hasText: todayTodo })
    await expect(todayTodoItem).not.toHaveClass('completed')
    await todayTodoItem.locator(todoPage.addedItemToggle).click()
    await expect(todayTodoItem).toHaveClass('completed')

    await todoPage.completedOption.click()
    await expect(todoPage.addedItemContainer).toContainText(todayTodo)
  })

  test('User can delete todo items', async () => {
    allure.story('User can delete a todo item')

    const { tomorrowTodo } = await todoPage.addItems()

    const tomorrowTodoItem = todoPage.addedItemContainer.filter({ hasText: tomorrowTodo })
    await tomorrowTodoItem.locator(todoPage.addedItemDeleteBtn).focus()
    await tomorrowTodoItem.locator(todoPage.addedItemDeleteBtn).dispatchEvent('click')

    expect(tomorrowTodoItem).toHaveCount(0)
  })
})

