import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { AuthorsService } from './authors.service';
import { UtilityService } from '../utility/utility.service';

@Controller('authors')
export class AuthorsController {
  /**
   * Authors controller constructor
   *
   * @param $authorsService
   * @param $utilityService
   */
  constructor(
    private readonly $authorsService: AuthorsService,
    private readonly $utilityService: UtilityService
  ) {}

  /**
   * GET request to all records in the `authors` table.
   *
   * @param skip
   * @param take
   * @param cursor
   * @param where
   * @param orderBy
   * @param select
   * @param include
   */
  @Get()
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  public async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.AuthorWhereUniqueInput,
    @Query('where') where?: Prisma.AuthorWhereInput,
    @Query('orderBy') orderBy?: Prisma.AuthorOrderByInput,
    @Query('select') select?: Prisma.AuthorSelect,
    @Query('include') include?: Prisma.AuthorInclude
  ): Promise<Author[]> {
    if(select) {
      select = this.$utilityService.convertBtoO(select as string);
    }
    if(include) {
      include = this.$utilityService.convertBtoO(include as string);
    }
    const query = { skip, take, cursor, where, orderBy, select, include };
    return this.$authorsService.findAll(query);
  }

  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  public async findOne(
    @Param('id') id: string,
    @Query('include') include: Prisma.AuthorInclude
  ): Promise<Author | null> {
    if(include) {
      include = this.$utilityService.convertBtoO(include as string);
    }
    const query = { where: { id: id }, include };
    return this.$authorsService.findOne(query);
  }

  @Post('')
  public async create(
    @Body() postData: Prisma.AuthorCreateInput
  ): Promise<Author> {
    return this.$authorsService.create(postData);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() postData: Author
  ): Promise<Author> {
    return this.$authorsService.update({
      where: { id: id } as Prisma.AuthorWhereUniqueInput,
      data: postData
    });
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Author> {
    return this.$authorsService.delete({ id: id } as Prisma.AuthorWhereUniqueInput)
  }
}
