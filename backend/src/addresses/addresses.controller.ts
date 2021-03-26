import { Body, Controller, Delete, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PoliciesGuard } from '../auth/policies.guard';
import { CheckPolicies } from '../auth/check-policies.decorator';
import { AppAbility, Action } from '../auth/casl-ability.factory';

import { AddressesService } from './addresses.service';
import { Address, CreateAddress } from './dto/address';

@Controller('addresses')
export class AddressesController {

  constructor(
    private readonly $addressesService: AddressesService
  ) {}

  /**
   * POST request to update a CreditCard in the `credit_cards` table
   *
   * @param postData The CreditCard data to be created
   */
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Address))
  public async create(
    @Body() postData: CreateAddress
  ): Promise<Address> {
    return this.$addressesService.create(postData);
  }

  /**
   * DELETE request to remove an CreditCard from the `credit_cards` table
   *
   * @param id The UUID of the CreditCard to be removed
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Address))
  public async delete(@Param('id') id: string): Promise<Address> {
    return this.$addressesService.delete({ id: id });
  }
}
