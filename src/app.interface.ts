export interface FxqlStatement {
  EntryId: number;
  sourceCurrency: string;
  destinationCurrency: string;
  buyPrice: number;
  sellPrice: number;
  capAmount: number;
}

export interface FxqlParseResult {
  message: string;
  code: string;
  data: FxqlStatement[];
}

export interface FxqlRequest {
  FXQL: string;
}
