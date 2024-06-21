import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '../components/SearchBar';

// Mock MUI components that give errors when trying to render in tests
// ran out of time to fix the errors, but unless you're specifically testing these components
// ability to render etc, then this is standard for unit tests
jest.mock('@mui/material/Box', () => ({ children, component, onSubmit }) => (
  <form onSubmit={onSubmit}>{children}</form>
));
jest.mock('@mui/material/TextField', () => ({ InputProps, ...props }) => (
  <input {...InputProps} {...props} />
));
jest.mock('@mui/material/Button', () => ({ children, ...props }) => (
  <button {...props}>{children}</button>
));
// this part sucked to get working, spent like 2 hours trying to get it to work
// from the official MUI forums and some discord users
jest.mock('@mui/material/Autocomplete', () => ({ 
  renderInput, 
  onInputChange, 
  ...props 
}) => (
  <div>
    {renderInput({ 
      InputProps: {
        ...props.InputProps,
        onChange: (event) => onInputChange(event, event.target.value),
      },
    })}
    <ul>
      {props.options.map((option) => (
        <li key={option}>{option}</li>
      ))}
    </ul>
  </div>
));

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnClear = jest.fn();
  const mockFetchCompletions = jest.fn();
  const mockCompletions = ['New York', 'Los Angeles', 'Chicago'];

  const defaultProps = {
    onSearch: mockOnSearch,
    onClear: mockOnClear,
    fetchCompletions: mockFetchCompletions,
    completions: mockCompletions,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search bar correctly', () => {
    render(<SearchBar {...defaultProps} />);
    // random elements on the searchbar i picked to identify it by
    expect(screen.getByPlaceholderText('Reveal the city of your quest..')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  let mockState = '';
  // mocking the useState function from react, so that we can test the state of the searchbar
  const mockSetState = jest.fn((newState) => { mockState = newState; });
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(() => [mockState, mockSetState])
  }));
  
  test("calls onSearch when form is submitted", async () => {

    // i didn't want to mock the onsearch/handlesearch function directly, so i mocked just the usestate inside of it
    // but since the onsearch/handlesearch is mostly just usestate calls and axios calls, it's effectively a mocked function
    // this is mainly just for demonstration since in a prod app you'd have more intricate logic
    // that you'd need to mock apart from just setting state and making async calls.
    const onSearch = (query) => {
      mockSetState(query);
    };
  
    render(
      <SearchBar 
        onSearch={onSearch} 
        onClear={() => {}} 
        fetchCompletions={() => {}}
        completions={[]}
      />
    );
  
    const input = screen.getByPlaceholderText("Reveal the city of your quest..");
    const submitButton = screen.getByRole("button", { name: "Submit" });
  
    fireEvent.change(input, { target: { value: "New York" } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(mockState).toBe("New York");
    });
  });

});
