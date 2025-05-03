import puppeteer from 'puppeteer';

// 打开浏览器
async function get_browser(path) {
  return await puppeteer.launch({
    args: [
      "--no-sandbox"
    ]
  });
}

// 创建页面
async function get_page(browser) {
  return await browser.newPage();
}

// 获取url
async function get_url(page, video_id) {
  let url = ""
  let base_url = ""
  await page.goto('https://m.miguvideo.com/m/liveDetail/' + video_id, { waitUntil: "networkidle2" });
  url = await page.waitForResponse(
    resp =>
      resp.request().url().startsWith("https://hlszymgsplive.miguvideo.com/")
  )
  base_url = await page.waitForResponse(
    resp =>
      resp.request().url().startsWith("https://h5live.gslb.cmvideo.cn/")
  )
  return url.request().url(), base_url.request().url()
}

// 关闭浏览器
async function close_browser(browser) {
  await browser.close()
}

export { get_browser, get_page, get_url, close_browser }
