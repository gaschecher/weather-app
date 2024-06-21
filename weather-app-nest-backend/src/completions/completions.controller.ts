import { Controller, Get, Query } from '@nestjs/common';

import { CompletionsService } from './completions.service';
import { ApiResponse } from '@nestjs/swagger';
import { CompletionDto } from './dto/completions-completions.dto';

@Controller('completions')
export class CompletionsController {
  constructor(private readonly completionsService: CompletionsService) {}
// straight forward call to the accuweather completions API via the completionsService
// i do some payload processing there
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of location suggestions',
    type: [CompletionDto],
  })
  async getCompletions(
    @Query('q') query: string,
  ) {
    return this.completionsService.getCompletions(query);
  }
}