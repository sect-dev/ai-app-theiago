export interface Message {
  token: string;
  cardDetails: CardDetails;
  iinData: iinData;
}

export interface CardDetails {
  bin: string;
  cardholder: string;
  expiryDate: string;
  last4: string;
  scheme: string;
}

export interface iinData {
  cardType: string;
  country: string;
  countryCode: string;
  issuer: string;
  scheme: string;
}
