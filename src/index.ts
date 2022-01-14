import { CompanyTypes, createScraper } from 'israeli-bank-scrapers';

require('dotenv').config();

type DiscountCredentials = {
  id: string,
  password: string,
  num: string,
};

const discountCredentials = {
  id: process.env.DISCOUNT_ID,
  password: process.env.DISCOUNT_PASSWORD,
  num: process.env.DISCOUNT_NUM,
} as DiscountCredentials;

async function printDiscount(bankCredentials: DiscountCredentials) {
  try {
    const options = {
      companyId: CompanyTypes.discount,
      startDate: new Date('2021-05-01'),
      combineInstallments: false,
    };

    const scraper = createScraper(options);
    const scrapeResult = await scraper.scrape(bankCredentials);

    if (scrapeResult.success) {
      scrapeResult.accounts!.forEach((account) => {
        console.log(`found ${account.txns.length} transactions for account number ${account.accountNumber}`);
        if (account.balance !== undefined) {
          console.log(`found balance: ${account.balance}. for account number ${account.accountNumber}`);
        }
      });
    } else {
      throw new Error(scrapeResult.errorType);
    }
  } catch (e: any) {
    console.error(`scraping failed for the following reason: ${e.message}`);
  }
}

printDiscount(discountCredentials);
