import { ApiProperty } from '@nestjs/swagger';

export class LocalAuth {
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
}
