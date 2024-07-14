import { Locator, Page } from '@playwright/test'

export class BasePage {
    readonly page: Page

    readonly li: Locator

    constructor(page: Page) {
        this.page = page

        this.li = this.page.locator('li')
    }
}
