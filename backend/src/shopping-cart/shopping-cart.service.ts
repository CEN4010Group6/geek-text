import { Injectable } from '@nestjs/common';
import { ShoppingCart as ShoppingCartModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ShoppingCart } from './dto/shopping-cart';

@Injectable()
export class ShoppingCartService {
  /**
   * Shopping Cart service contructor
   *
   * @param $prisma;
   */
  constructor(private readonly $prisma: PrismaService) { }

  /**
   * Find a single Shopping Cart in the 'shopping_carts' table
   *
   * @param shoppingCartWhereUniqueInput
   */
  public async findOne(
    params: { where: Prisma.ShoppingCartWhereUniqueInput; select?: Prisma.ShoppingCartSelect; }
  ): Promise<ShoppingCart | null> {
    const { where, select } = params;

    const dbShoppingCart = await this.$prisma.shoppingCart.findUnique({ where, select }) as ShoppingCartModel | null;

    let shoppingCart: any;

    if (dbShoppingCart) {
      shoppingCart = new ShoppingCart(dbShoppingCart);
    }
    return shoppingCart;
  }

  /**
   * Find all Shoppping Carts in the 'shopping_carts' table
   *
   * @param shoppingCartWhereUniqueInput
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShoppingCartWhereUniqueInput;
    where?: Prisma.ShoppingCartWhereInput;
    orderBy?: Prisma.ShoppingCartOrderByInput;
    select?: Prisma.ShoppingCartSelect;
  }): Promise<ShoppingCart[]> {
    const { skip, take, cursor, where, orderBy, select } = params;
    return (this.$prisma.shoppingCart.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    }) as unknown) as ShoppingCart[];
  }

  /**
   * Create a new Shopping Cart in the `shopping_carts` table
   *
   * @param data The Shopping Cart to be created
   */
  public async create(
    data: Prisma.ShoppingCartCreateInput,
  ): Promise<ShoppingCart> {
    return this.$prisma.shoppingCart.create({
      data,
    });
  }

  /**
   * Updates a Shopping Cart in the `shopping_carts` table
   *
   * @param params Updated Shopping Cart data
   */
  public async update(params: {
    where: Prisma.ShoppingCartWhereUniqueInput;
    data: Prisma.ShoppingCartUpdateInput;
  }): Promise<ShoppingCart> {
    const { where, data } = params;
    return this.$prisma.shoppingCart.update({
      data,
      where,
    });
  }

  /**
   * Removes a Shopping Cart entry from the `shopping_carts` table
   *
   * @param where The unique identifier(s) of the Shopping Cart to be removed
   */
  public async delete(
    where: Prisma.ShoppingCartWhereUniqueInput,
  ): Promise<ShoppingCart> {
    return this.$prisma.shoppingCart.delete({
      where,
    });
  }
}
