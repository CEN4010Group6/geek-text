import { UtilityService } from './../utility/utility.service';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Public } from '../public.decorator';

import { Resource } from '../interface/resource.interface';
import { UsersService } from './users.service';
import { CreateUser, UpdateUser, User } from './dto/user';
import { ParseIntPipe } from '../parse-int.pipe';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';
import { CheckPolicies } from '../auth/check-policies.decorator';
import { PoliciesGuard } from '../auth/policies.guard';
import { AppAbility, Action } from '../auth/casl-ability.factory';

@Controller('users')
export class UsersController implements Resource {
    /**
   * Users controller constructor
   *
   * @param $usersService The database connection to the `users` table
   */
  constructor(
    private readonly $utilityService: UtilityService,
    private readonly $usersService: UsersService
  ) {}

  /**
   * GET request to find all records in the `users` table.
   *
   * @param query Query parameters to alter the `WHERE` SQL clause
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, User))
  public async findAll(
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('cursor', ParseFrontendBtoaPipe) cursor?: Prisma.UserWhereUniqueInput,
    @Query('where', ParseFrontendBtoaPipe) where?: Prisma.UserWhereInput,
    @Query('orderBy', ParseFrontendBtoaPipe) orderBy?: Prisma.UserOrderByInput,
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.UserSelect
  ): Promise<User[]> {
    const query = { skip, take, cursor, where, orderBy, select };
    return this.$usersService.findAll(query);
  }

  /**
   * GET request to find a User by a string UUID
   *
   * @param id The UUID of the requested User
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.UserSelect
  ): Promise<User | null> {
    const query = { where: { id: id }, select };
    return this.$usersService.findOne(query);
  }

  /**
   * POST request to create a new User in the `users` table
   *
   * @param postData The Book data to be created
   */
  @Post('')
  @Public()
  public async create(
    @Body() postData: {
      email: string;
      password: string;
      firstName: string;
      middleName?: string;
      lastName: string;
      nickName: string;
    }
  ): Promise<User> {
    return this.$usersService.create(postData);
  }

  /**
   * PUT request to update a User in the `users` table
   *
   * @param id The UUID of the User to be updated
   * @param bookData The updated information of the Book
   */
  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() postData: UpdateUser
  ): Promise<User> {
    return this.$usersService.update({
      where: { id: id } as Prisma.UserWhereUniqueInput,
      data: postData
    });
  }

  /**
   * DELETE request to remove a User from the `users` table
   *
   * @param id The UUID of the User to be removed
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, User))
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.$usersService.delete({id: id} as Prisma.UserWhereUniqueInput);
  }
}
