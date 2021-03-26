import { Body, Controller, Delete, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PoliciesGuard } from '../auth/policies.guard';
import { CheckPolicies } from '../auth/check-policies.decorator';
import { AppAbility, Action } from '../auth/casl-ability.factory';
import { CreditCardsService } from './credit-cards.service';
import { CreditCard } from './dto/credit-card';

@Controller('credit-cards')
export class CreditCardsController {

  constructor(
    private readonly $creditCardsService: CreditCardsService
  ) {}

  /**
   * POST request to update a CreditCard in the `credit_cards` table
   *
   * @param postData The CreditCard data to be created
   */
  @Post(':userId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, CreditCard))
  public async create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() postData: {
      nickName: string;
      creditCardNumber: string;
      ccv: number;
      expirationDate: Date | string,
      lastFourDigits: number;
      isPreferredCreditCard: boolean;
    }
  ): Promise<CreditCard> {
    return this.$creditCardsService.create(userId, postData);
  }

  /**
   * DELETE request to remove an CreditCard from the `credit_cards` table
   *
   * @param id The UUID of the CreditCard to be removed
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, CreditCard))
  public async delete(@Param('id') id: string): Promise<CreditCard> {
    return this.$creditCardsService.delete({ id: id } as Prisma.AuthorWhereUniqueInput)
  }
}
