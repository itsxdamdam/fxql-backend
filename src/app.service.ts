import { BadRequestException, Injectable } from '@nestjs/common';
import { FxqlStatement } from './app.interface';
import { PrismaService } from './prisma.service';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async parseAndStore(fxqlString: string): Promise<FxqlStatement[]> {
    const statements = this.splitStatements(fxqlString);
    if (statements.length > 1000) {
      throw new BadRequestException(
        'Exceeded maximum limit of 1000 currency pairs',
      );
    }

    const parsedPairs: FxqlStatement[] = [];
    for (const statement of statements) {
      const parsedPair = await this.processStatement(statement);
      if (parsedPair) {
        parsedPairs.push(parsedPair);
      }
    }

    return parsedPairs;
  }

  private splitStatements(fxqlString: string): string[] {
    return fxqlString
      .split('\n\n')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);
  }

  private async processStatement(
    statement: string,
  ): Promise<FxqlStatement | null> {
    const currencyPairRegex =
      /^([A-Z]{3})-([A-Z]{3})\s*{[\s\n]*BUY\s+(\d+\.?\d*)\s*SELL\s+(\d+\.?\d*)\s*CAP\s+(\d+)\s*}$/;
    const match = statement.match(currencyPairRegex);

    if (!match) {
      throw new BadRequestException('Invalid FXQL syntax');
    }

    const [
      ,
      sourceCurrency,
      destinationCurrency,
      buyPrice,
      sellPrice,
      capAmount,
    ] = match;

    return await this.prisma.fxqlStatement.upsert({
      where: {
        sourceDestination: {
          sourceCurrency: sourceCurrency,
          destinationCurrency: destinationCurrency,
        },
      },
      update: {
        BuyPrice: parseFloat(buyPrice),
        sellPrice: parseFloat(sellPrice),
        capAmount: parseInt(capAmount),
      },
      create: {
        sourceCurrency: sourceCurrency,
        DestinationCurrency: destinationCurrency,
        BuyPrice: parseFloat(buyPrice),
        SellPrice: parseFloat(sellPrice),
        capAmount: parseInt(capAmount),
      },
    });
  }
}
