const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

async function getData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let url =
        "https://juno.vn/collections/giay?itm_source=homepage&itm_medium=menu&itm_campaign=normal&itm_content=giay";
    await page.goto(url);

    await autoScroll(page);

    const data = await page.content();
    await browser.close();
    processData(data, "//theme.hstatic.net/1000003969/1000659821/14/product-1.gif?v=2950");
}
getData();

function processData(data, lazyLoadFilenameDefault = null) {
    console.log("Processing Data...");
    const $ = cheerio.load(data);
    const posts = [];
    $(".product-block").each(function (i, el) {
        let imgs = [];
        $(el)
            .find(".product-img .img-loop")
            .each(function (i, el) {
                // Tránh ảnh default lazy load
                if ($(el).attr("src") != lazyLoadFilenameDefault) {
                    imgs.push($(el).attr("src"));
                }
            });
        posts.push({
            title: $(el).find(".pro-name").text().trim(),
            price: $(el).find(".box-pro-prices").text().trim(),
            image: imgs,
        });
    });
    fs.writeFileSync("data.json", JSON.stringify(posts, null, 2));
    console.log("Complete");
}

// tránh lazy load
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
