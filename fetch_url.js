import fs from "fs"
import { data_list } from "./utils/fetch_list.js"
import { close_browser, get_browser, get_page, get_url } from "./utils/get_url.js"

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function fetch_url() {

  // 必须绝对路径
  let path = process.cwd() + '/interface.txt'
  // 文件不存在则创建
  if (!fs.existsSync(path)) {
    fs.writeFile(path, "", error => {
      if (error) {
        throw new Error("文件创建失败")
      }
      console.log("文件创建成功")
    })
  }
  await delay(1000)

  // 备份文件
  fs.copyFile(path, path + ".bak", error => {
    if (error) {
      throw error
    }
    console.log("文件备份成功")
  })

  await delay(1000)
  fs.writeFile(path, "", error => {
    if (error) {
      throw new Error("文件清除失败")
    }
    console.log("文件清除成功")
  })
  let datas = await data_list()
  let browser = await get_browser(null)
  let page = await get_page(browser)
  for (let i = 0; i < datas.length; i++) {

    console.log("正在写入分类###:" + datas[i].name)
    // 写入分类数据
    fs.appendFile(path, datas[i].name + ",#genre#\n", error => {
      if (error) {
        throw new Error("写入失败")
      }
    })

    let data = datas[i].dataList
    for (let j = 0; j < data.length; j++) {
      let link
      // try {
        let base_link
        link, base_link = await get_url(page, data[j].pID)

        if (!link && base_link.length >= 1) {

          let i = 0
          while (true) {
            // try {
              // 加载10次，失败就退出
              if (i == 10) {
                break
              }
              i++
          console.log("尝试次数，h5"+i)
              link = await fetch(base_link, {
                method: "GET"
              }).then(res => res.text())
              if (link) {
                break
              }
            // } catchr(error) {
            //   continue
            // }
          }
        }

        if (!link) {
          continue
        }
      // } catch (error) {
      //   await close_browser(browser)
      //   throw new Error("链接获取失败")
      // }
      console.log("正在写入节目:" + data[j].name)
      // 写入分类数据
      fs.appendFile(path, data[j].name + "," + link, error => {
        if (error) {
          throw new Error("写入失败")
        }
      })
    }

  }
  await close_browser(browser)
}

fetch_url()
