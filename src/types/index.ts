export interface Field {
  id: number;
  value: string;
  vowelCount: number;
  highlighted: boolean;
}

export interface SearchInputProps {
  searchQuery: string;
  searchQueryMatches: boolean;
}

export interface FieldInputProps {
  field: Field;
  index: number;
}

export interface ButtonProps {
  buttonClass: string;
  disabled: boolean;
}
