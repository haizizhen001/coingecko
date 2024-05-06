const calculateMaxProfit = (stockPrices: number[]): number => {
    if (stockPrices.length < 2) {
        return 0; // Cannot make a profit with less than 2 prices
    }
    let cursor = 0;
    let maxProfit = 0;
    do {
        let buyPrice = stockPrices[cursor];
    
        for (let i = cursor + 1; i < stockPrices.length; i++) {
            const currentPrice = stockPrices[i];
            const interest = currentPrice - buyPrice;
            if (interest > maxProfit) {
                maxProfit = interest;
            }
        }
        cursor++;
    } while (cursor < stockPrices.length - 1);

    return maxProfit;
}

const stockPriceList = [2, 3, 6, 4, 3];
console.log("List " + stockPriceList)

console.log("value " + calculateMaxProfit(stockPriceList)); 