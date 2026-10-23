export type Partner = {
  id: string;
  name: string;
  logo: string;
  websiteUrl: string;
  affiliateUrl: string;
  discountText: string;
  couponCode: string;
  rating: number;
  maxAccounts: number;
  platforms: string[];
  isActive: boolean;
  sortOrder: number;
};

export const partners: Partner[] = [
  {
    id: "top-one-futures",
    name: "Top One Futures",
    logo: "",
    websiteUrl: "https://www.toponefutures.com/",
    affiliateUrl: "",
    discountText: "50% OFF!",
    couponCode: "",
    rating: 5,
    maxAccounts: 20,
    platforms: ["Tradovate", "NinjaTrader", "Wealthcharts", "TradingView", "Black Arrow"],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "vest-markets",
    name: "Vest Markets",
    logo: "",
    websiteUrl: "https://www.vestmarkets.com/",
    affiliateUrl: "",
    discountText: "5% OFF!",
    couponCode: "",
    rating: 5,
    maxAccounts: 10,
    platforms: ["Vest Markets"],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "lucid-trading",
    name: "Lucid Trading",
    logo: "",
    websiteUrl: "https://lucidtrading.com/",
    affiliateUrl: "",
    discountText: "40% Off",
    couponCode: "",
    rating: 5,
    maxAccounts: 5,
    platforms: ["Tradovate"],
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "take-profit-trader",
    name: "Take Profit Trader",
    logo: "",
    websiteUrl: "https://takeprofittrader.com/",
    affiliateUrl: "",
    discountText: "40% Off",
    couponCode: "",
    rating: 5,
    maxAccounts: 5,
    platforms: ["Tradovate", "TradingView", "NinjaTrader"],
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "apex-trader-funding",
    name: "Apex Trader Funding",
    logo: "",
    websiteUrl: "https://apextraderfunding.com/",
    affiliateUrl: "",
    discountText: "90% Off",
    couponCode: "",
    rating: 5,
    maxAccounts: 20,
    platforms: ["Tradovate", "Rithmic", "Wealthcharts"],
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "tradeify",
    name: "Tradeify",
    logo: "",
    websiteUrl: "https://tradeify.co/",
    affiliateUrl: "",
    discountText: "30% Off",
    couponCode: "",
    rating: 5,
    maxAccounts: 5,
    platforms: ["Tradovate", "NinjaTrader", "Quantower"],
    isActive: true,
    sortOrder: 6,
  },
  {
    id: "blusky-trading",
    name: "BluSky Trading",
    logo: "",
    websiteUrl: "https://blusky.pro/",
    affiliateUrl: "",
    discountText: "30% Off",
    couponCode: "",
    rating: 5,
    maxAccounts: 5,
    platforms: ["Tradovate", "NinjaTrader", "Volumetrica"],
    isActive: true,
    sortOrder: 7,
  },
  {
    id: "legends-trading",
    name: "Legends Trading",
    logo: "",
    websiteUrl: "https://www.legendstrading.com/",
    affiliateUrl: "",
    discountText: "40% Off",
    couponCode: "",
    rating: 5,
    maxAccounts: 10,
    platforms: ["Tradovate", "NinjaTrader", "Rithmic"],
    isActive: true,
    sortOrder: 8,
  },
];

export function activePartners() {
  return partners
    .filter((partner) => partner.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function partnerHref(partner: Partner) {
  return partner.affiliateUrl.trim() || partner.websiteUrl.trim() || "";
}
