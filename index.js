const axios = require("axios")
const cheerio = require("cheerio")


const URL = "https://www.amazon.in/Apple-iPhone-13-128GB-Blue/dp/B09G9BL5CP/ref=sr_1_1_sspa?crid=1F8T4RIV4PS6X&dib=eyJ2IjoiMSJ9.eFa-TvbcC_zjCq_5PD2KOzq8FGFIoVfOOaz8akTXGAS5Gz9e2PbRJTLGIEpMmwndCMr9RKyIvkuTb2DMiD1HDT81jlC8oQzh6q8sKKgM26DQHDRt3AqjDvnytD7OfsnFglH8wjXQ3Ww_gVB_4PPNYb1YcDwBnkdeiZLr6gN9Q4zpnOj-GqZsztFILbD6rJAzdX-chn0qM8_i2J--ypvdYOkA91By8ZSc1WkXR5SQkZ8.Bi8UTmTBv6eZnPt2dcoGSNWPnxqZBfUpqZ_NHch6USM&dib_tag=se&keywords=iphone&qid=1711300193&sprefix=iphone%2Caps%2C230&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
const MAX_VALUE = 52090


const handel = setInterval(scrapeAmazone, 5000)

async function scrapeAmazone() {

    try {
        const { data } = await axios.get(URL)
        const $ = cheerio.load(data)


        const productDiv = $("div#centerCol")
        const title = $(productDiv).find("span#productTitle").text().trim()
        const price = Number($(productDiv).find("span.a-price-whole").text().replaceAll(",", "").replaceAll(".", ""))
        const link = URL
        console.log({ title, price, link })

        if(price <= MAX_VALUE){
            console.log("ALERT BUY NOW!!!")
            clearInterval(handel)
            return
        }

    } catch (error) {
        console.log("Oops!! Some Error Occured", error)
        clearInterval(handel)
    }

}