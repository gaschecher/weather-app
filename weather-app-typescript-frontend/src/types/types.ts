export type WeatherCardProps = {
  searchQuery: string;
  weatherData: WeatherData | null | undefined;
  onRefresh: () => void;
};

export interface WeatherData {
  temperature: number;
  description: string;
  realFeel: number;
  realFeelShade: number;
  wind: string;
  windGusts: number;
  currentTime: string;
}
export interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  fetchCompletions: (query: string) => void;
  completions: string[];
}

export interface ForecastCardProps {
  forecastData: any[];
}