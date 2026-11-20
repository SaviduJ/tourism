export const tripLengths = ["3 days", "5 days", "7 days", "10 days", "14 days", "Flexible"];
export const budgets = ["Under $750", "$750–$1,500", "$1,500–$3,000", "$3,000+", "Not sure yet"];
export const travelStyles = ["A little of everything", "Culture & history", "Nature & wildlife", "Beaches & relaxation", "Luxury & wellness", "Adventure"];
export const enquiryStatuses = ["New", "In progress", "Closed"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];
export function isEnquiryStatus(value: string): value is EnquiryStatus {
  return enquiryStatuses.some((status) => status === value);
}