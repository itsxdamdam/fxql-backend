export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
  CAP = 'CAP',
}

export interface CurrencyPair {
  base: string;
  quote: string;
  toString(): string;
}

export interface TransactionRate {
  type: TransactionType;
  amount: number;
}

export interface FXQLStatement {
  pair: CurrencyPair;
  rates: TransactionRate[];
  timestamp?: Date;
}

export interface FXQLParseResult {
  isValid: boolean;
  statement?: FXQLStatement;
  error?: string;
}

export interface IFXQLParserService {
  parse(statement: string): FXQLParseResult;
  validate(statement: FXQLStatement): boolean;
}