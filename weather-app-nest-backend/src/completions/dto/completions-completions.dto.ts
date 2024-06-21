import { ApiProperty } from '@nestjs/swagger';

// these are all classes and not interfaces/types as nestjs decorators only work with 
// classes AFAIK
// these API properties are all added to get this to show up in swagger :)

export class CompletionDto {
  @ApiProperty({
    description: 'The name of the location suggestion',
    example: 'Greensboro, North Carolina, US',
  })
  name: string;
}