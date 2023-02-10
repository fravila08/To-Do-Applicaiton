import puppeteer, { Browser, Page } from "puppeteer";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Opens application and creates a new Task", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8000/");
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("Creating a Task", () => {
    it("will create and display new task under `pending`", async () => {
      await page.waitForSelector("#taskSelectedBtn1");
      await page.waitForSelector("#taskSelectedBtn2");
      await page.waitForSelector("#taskSelectedBtn3");
      await page.waitForSelector("#changeStatusBtn");
      await page.click("#taskSelectedBtn1");
      await page.click("#taskSelectedBtn2");
      await page.click("#taskSelectedBtn3");
      await page.click("#changeStatusBtn");
      let completeList = await page.$$("#CompletedList");
      let lastItem = await completeList[completeList.length - 1];

      await lastItem.evaluate((item) => item.innerHTML);
      await page.waitForSelector("#task2");

      let taskText = await page.$eval("#task2", (task) => task.innerHTML);

      expect(taskText).toBe("Code some more");
    });
  });
});
