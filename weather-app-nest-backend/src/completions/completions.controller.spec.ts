import { Test, TestingModule } from '@nestjs/testing';
import { CompletionsController } from './completions.controller';
import { CompletionsService } from './completions.service';


describe('CompletionsController', () => {
  let controller: CompletionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletionsController],
      providers: [CompletionsService], // Add this line
    }).compile();

    controller = module.get<CompletionsController>(CompletionsController);
  });
// just a generic test to make sure the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// the getCompletions is a simple function so i just have generic tests here
describe('CompletionsController getCompletions', () => {
  let controller: CompletionsController;
  let completionsService: CompletionsService;
// jest setup before each test to ensure consistency and DRY code
  beforeEach(async () => {
    completionsService = { getCompletions: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletionsController],
      providers: [
        { provide: CompletionsService, useValue: completionsService },
      ],
    }).compile();

    controller = module.get<CompletionsController>(CompletionsController);
  });
// all the axios calls are mocked, since i'm just testing the getCompletions function
  it('should return completions for a valid query', async () => {
    const query = 'green';
    const expectedResponse = ['greensboro', 'greensville'];
    completionsService.getCompletions = jest
      .fn()
      .mockResolvedValue(expectedResponse);
    const result = await controller.getCompletions(query);
    expect(result).toEqual(expectedResponse);
  });

  it('should handle empty query string', async () => {
    const query = '';
    const expectedResponse = [];
    completionsService.getCompletions = jest
      .fn()
      .mockResolvedValue(expectedResponse);
    const result = await controller.getCompletions(query);
    expect(result).toEqual(expectedResponse);
  });

  it('should handle null query parameter', async () => {
    const query = null;
    const expectedResponse = [];
    completionsService.getCompletions = jest
      .fn()
      .mockResolvedValue(expectedResponse);
    const result = await controller.getCompletions(query);
    expect(result).toEqual(expectedResponse);
  });

});
