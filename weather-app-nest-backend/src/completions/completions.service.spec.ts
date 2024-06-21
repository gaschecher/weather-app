import { Test, TestingModule } from '@nestjs/testing';
import { CompletionsService } from './completions.service';
import axios from 'axios';

describe('CompletionsService', () => {
  let service: CompletionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletionsService],
    }).compile();

    service = module.get<CompletionsService>(CompletionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('CompletionsService getCompletions', () => {
  let service: CompletionsService;
  let mockAxios;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletionsService],
    }).compile();

    service = module.get<CompletionsService>(CompletionsService);
    mockAxios = {
      get: jest.fn(),
    };
    axios.get = mockAxios.get;
  });

  it('should return data when API call is successful', async () => {
    const query = 'new york';
    const mockData = [
      {
        LocalizedName: 'New York',
        AdministrativeArea: { LocalizedName: 'New York' },
        Country: { ID: 'US' },
      },
    ];
    mockAxios.get.mockResolvedValue({ data: mockData });

    const result = await service.getCompletions(query);
    const expectedData = [
      {
        name: 'New York, New York, US',
      },
    ];
    expect(result).toEqual(expectedData);
  });

  it('should throw an error when API call fails', async () => {
    const query = 'new york';
    mockAxios.get.mockRejectedValue(new Error('API call failed'));

    await expect(service.getCompletions(query)).rejects.toThrow(
      'API call failed',
    );
  });

  it('should return empty array when query is empty', async () => {
    const query = '';
    const mockData = [];
    mockAxios.get.mockResolvedValue({ data: mockData });

    const result = await service.getCompletions(query);
    expect(result).toEqual(mockData);
  });

  it('should limit results to 5 items', async () => {
    const query = 'green';
    const mockData = new Array(10).fill(null).map((_, index) => ({
      LocalizedName: `City${index}`,
      AdministrativeArea: { LocalizedName: `State${index}` },
      Country: { ID: 'US' },
    }));
    mockAxios.get.mockResolvedValue({ data: mockData });

    const result = await service.getCompletions(query);
    expect(result.length).toBe(5);
  });

  it('should correctly transform data', async () => {
    const query = 'green';
    const mockData = [
      {
        LocalizedName: 'Greensboro',
        AdministrativeArea: { LocalizedName: 'North Carolina' },
        Country: { ID: 'US' },
      },
    ];
    mockAxios.get.mockResolvedValue({ data: mockData });

    const expected = [
      {
        name: 'Greensboro, North Carolina, US',
      },
    ];

    const result = await service.getCompletions(query);
    expect(result).toEqual(expected);
  })

  it('should return an empty array when API returns no data', async () => {
    const query = 'unknowncity';
    mockAxios.get.mockResolvedValue({ data: [] });

    const result = await service.getCompletions(query);
    expect(result).toEqual([]);
  });

  it('should handle API errors gracefully', async () => {
    const query = 'error';
    mockAxios.get.mockRejectedValue(new Error('API error'));

    await expect(service.getCompletions(query)).rejects.toThrow('API error');
  });
});
