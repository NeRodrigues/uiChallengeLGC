import { Locator } from "@playwright/test"
import { BasePage } from "./basePage"

export class TodoPage extends BasePage {
    readonly addItemInput: Locator = this.page.getByTestId('text-input')
    readonly todoList:Locator = this.page.getByTestId('todo-list')
    readonly addedItemContainer:Locator = this.page.getByTestId('todo-item')
    readonly addedItemList:Locator = this.page.getByTestId('todo-item-label')
    readonly addedItemToggle:Locator = this.page.getByTestId('todo-item-toggle')
    readonly footer:Locator = this.page.locator('.filters')
    readonly footerOptions:Locator = this.footer.locator(this.li)
    readonly completedOption:Locator = this.footerOptions.filter({hasText: 'Completed'})
    readonly addedItemDeleteBtn:Locator = this.page.getByTestId('todo-item-button')
    readonly delete:Locator = this.page.locator('.destroy:after')


    dateFormatter(date: Date): string {
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-')

        return formattedDate
    }

    getCurrentDate(): string {
        const today = new Date()

        return this.dateFormatter(today)
    }

    getNextDate(): string {
        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)

        return this.dateFormatter(tomorrow)
    }

    async addItems(): Promise < {todayTodo: string;tomorrowTodo: string} > {
        const currentDate = this.getCurrentDate()
        const todayTodo = 'TODO 1 - ' + currentDate
        await this.addItemInput.fill(todayTodo)
        await this.addItemInput.press('Enter')

        const tomorrowDate = this.getNextDate()
        const tomorrowTodo = 'TODO 2 - ' + tomorrowDate
        await this.addItemInput.fill(tomorrowTodo)
        await this.addItemInput.press('Enter')

        return {
            todayTodo,
            tomorrowTodo
        }
    }
}
