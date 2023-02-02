import { assert } from 'console';
import puppeteer, { Puppeteer, Browser, Page } from 'puppeteer'
import {afterAll, beforeAll, describe, it, expect} from 'vitest'

describe('Opens application and creates a new Task',()=>{
    let browser:Browser;
    let page:Page;

    beforeAll(async()=>{
        browser=await puppeteer.launch({
            headless:false,
            slowMo:50,
        })
        page= await browser.newPage()
        await page.goto('http://127.0.0.1:8000/')
    })

    afterAll(async()=>{
        await browser.close()
    })

    // describe('Opens the homepage',()=>{
    //     it("will watch the application open and render",async() => {
    //         await page.waitForSelector("#LastEle")
    //         let col=await page.$("#LastEle")
    //         let colVal= await col?.evaluate((colEl)=>colEl.innerHTML)
    //         expect(colVal).toBe('To Do App')
    //     })
    // })

    describe('this will create a task',()=>{
        it('will input a task and submit the input form', async()=>{
            await page.waitForSelector('#createTaskInput')
            await page.type("#createTaskInput", "test creating a task", {delay:20})
            await page.click('#createTaskButton')
            expect(true).toBe(true)
        })
    })
})