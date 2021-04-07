const puppeter = require("puppeteer");
const fs = require("fs");

const main = async () => {
  const browser = await puppeter.launch({headless : false}); // 파라미터로 {headless : false} 를 넣으면 눈에 보임 기본값 true
  const page = await browser.newPage(); // 크롬의 탭생성

  // 페이지의 크기를 설정한다. 기본값 800x600
  await page.setViewport({
    width: 1366,
    height: 768,
  });

  await page.goto("https://www.naver.com", { waitUntil: "networkidle2" }); // 페이지로 이동

  // case 1
  //let a = await page.$eval("body > div.container > div > div.col-xs-9.col-sm-9.col-md-9.col-lg-9 > div > div:nth-child(1) > div > a > p:nth-child(3) > span",eh => eh.innerText); // 셀렉터로 엘리먼트 지정
  //console.log(a);

  // case 2
  // let title = await page.$(".title"); // 셀렉터로 엘리먼트 지정
  // let b = await page.evaluate((data) => {
  //   return data.innerText;
  // }, title);
  // console.log(b);

  // caes 3
  async function sub() {
    let titles = await page.$$(".title"); // 셀렉터로 엘리먼트 지정
    titles.forEach(async (title) => {
      let c = await page.evaluate((data) => {
        return data.innerText;
      }, title);
      console.log(c);
    });
  }


  // < 페이지 전환 >
  // case 1
  // page.click(SELECTOR)
  // case 2
  // 알고 있는 주소로 들어감!
  

  await sub();

  // await browser.close(); // 브라우저 닫기
};

main();
