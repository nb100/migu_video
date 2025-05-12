import { close_browser, get_browser } from "./utils/get_url.js"


function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function refresh(url) {

  let browser = await get_browser(null)
  let page = await get_page(browser)
  await page.goto(url, { waitUntil: "networkidle2" })
  let video = await page.screencast({ path: 'recording.webm' })
  delay(5000)
  await video.stop()

  close_browser(browser)
}

refresh("http://hlsztemgsplive.miguvideo.com:8080/migu/kailu/cctv1/221308/20231124/01.m3u8?msisdn=8b95309dfa6edf746d5a78e20770d317&mdspid=&spid=699004&netType=7&sid=2201057821&pid=2028597139&timestamp=20250511224105&Channel_ID=0116_2600036500-99000-200300220100002&ProgramID=60880742020250511024&ParentNodeID=-99&assertID=2201057821&client_ip=2409:893d:3940:809:1872:d201:4eb:60a4&SecurityKey=20250511224105&promotionId=ccd6c633-7a15-47a7-849e-1d50ef919fcb&mvid=2201057821&mcid=500020&playurlVersion=ZQ-A1-8.4.2-RELEASE&userid=1428589774&jmhm=8b95309dfa6edf746d5a78e20770d317&videocodec=h265&bean=mgspad&tid=android&conFee=0&mtv_session=d03b4bcf54f4400b2ff153a412b54cb0&sv=10004&ct=android&jid=9982eaa263cba5b531d87ee3e46d145e1746974464469Q&sjid=subsession_1746974464632&HlsSubType=1&HlsProfileId=1&nphaid=0&encrypt=b0b331dc159be9d33c8c6542efc753e2")
