

/**
 * 初始化wasm
 * @param {string} masmURL - wasm地址
 * @returns {object} - wasm导出的内容
 */
async function init_wasm(masmURL) {
  // 获取wasm文件
  let resp = await fetch(masmURL);
  // 初始化
  let { instance } = await WebAssembly.instantiateStreaming(resp)
  return instance;
}
const exports = await init_wasm("https://cdnm.miguvideo.com/mgs/common/miguvendor/prd/playurl-crypto.wasm")
console.log(exports)
