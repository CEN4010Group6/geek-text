import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ParseUUIDPipe
} from '@nestjs/common';
import { ShoppingCart, Prisma } from '@prisma/client';
import { PoliciesGuard } from '../auth/policies.guard';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';
import { UtilityService } from './../utility/utility.service';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  /**
   * Shopping Cart controller constructor
   *
   * @param $shoppingCartService The database connection to the `shopping_carts` table
   */
  constructor(
    private readonly $utilityService: UtilityService,
    private readonly $shoppingCartService: ShoppingCartService,
  ) { }

  /**
   * GET request to find all records in the `shopping_carts` table
   *
   * @param query Query parameters that alter the `WHERE` SQL clause
   */
  @Get()
  @Header('Cache-Control', 'max-age=0; s-max-age=3600, proxy-revalidate')
  @UseGuards(PoliciesGuard)
  public async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.ShoppingCartWhereUniqueInput,
    @Query('where') where?: Prisma.ShoppingCartWhereInput,
    @Query('orderBy') orderBy?: Prisma.ShoppingCartOrderByInput,
    @Query('select') select?: Prisma.ShoppingCartSelect,
    @Query('include') include?: Prisma.ShoppingCartInclude,
  ): Promise<ShoppingCart[]> {
    if (select)
      select = await this.$utilityService.convertBtoO(select as string);
    if (include)
      include = await this.$utilityService.convertBtoO(include as string);
    if (where) where = await this.$utilityService.convertBtoO(where as string);
    if (cursor)
      cursor = await this.$utilityService.convertBtoO(cursor as string);
    if (orderBy)
      orderBy = await this.$utilityService.convertBtoO(orderBy as string);

    const query = { skip, take, cursor, where, orderBy, select, include };

    return this.$shoppingCartService.findAll(query);
  }

  /**
   * GET request to find a Shopping Cart by a string UUID
   *
   * @param id The UUID of the requested Shopping Cart
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  public async findOne(@Param('id', ParseUUIDPipe) id: string, @Query('select', new ParseFrontendBtoaPipe) select?: Prisma.ShoppingCartSelect): Promise<ShoppingCart | null> {

    const query = { where: { id: id }, select };

    return this.$shoppingCartService.findOne(
      query
    );
                                            }

  /**
   * POST request to create a new ShoppingCart in the `shopping_carts` table
   *
   * @param postData The Shopping Cart data to be created
   */
  @Post('')
  @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, ShoppingCart)) TODO ask about this
  public async create(
    @Body() postData: Prisma.ShoppingCartCreateInput
  ): Promise<ShoppingCart> {
    return this.$shoppingCartService.create(postData);
  }

  /**
   * PUT request to update a ShoppingCart in the `shopping_carts` table
   *
   * @param id The UUID of the Shopping Cart to be updated
   * @param postData The updated information of the Shopping Cart
   */
  @Put(':id')
  @UseGuards(PoliciesGuard)
  public async update(
    @Param('id') id: string,
    @Body() postData: Prisma.ShoppingCartCreateInput,
  ): Promise<ShoppingCart> {
    return this.$shoppingCartService.update({
      where: { id: id } as Prisma.BookWhereUniqueInput,
      data: postData,
    });
  }

  /**
   * DELETE request to remove a Shopping Cart from the `shopping_carts` table
   *
   * @param id The UUID of the Shopping Cart to be removed
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  public async delete(@Param('id') id: string): Promise<ShoppingCart> {
    return this.$shoppingCartService.delete({
      id: id,
    } as Prisma.ShoppingCartWhereUniqueInput);
  }
}
