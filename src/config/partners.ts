export type Partner = {
  id: string;
  name: string;
  logo: string;
  websiteUrl: string;
  affiliateUrl: string;
  discountText: string;
  couponCode: string;
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
    discountText: "",
    couponCode: "",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "apex-trader-funding",
    name: "Apex Trader Funding",
    logo: "",
    websiteUrl: "https://apextraderfunding.com/",
    affiliateUrl: "",
    discountText: "",
    couponCode: "",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "take-profit-trader",
    name: "Take Profit Trader",
    logo: "",
    websiteUrl: "https://takeprofittrader.com/",
    affiliateUrl: "",
    discountText: "",
    couponCode: "",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "bulenox",
    name: "Bulenox",
    logo: "",
    websiteUrl: "https://bulenox.com/",
    affiliateUrl: "",
    discountText: "",
    couponCode: "",
    isActive: true,
    sortOrder: 4,
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
