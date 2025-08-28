export type FilterType = 'select' | 'input' | 'date';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDropdownProps {
  title: string;
  type: FilterType;
  value: string;
  onValueChange: (value: string) => void;
  onApplyFilter: () => void;
  onReset: () => void;
  isVisible: boolean;
  options?: FilterOption[];
  placeholder?: string;
}

export interface UserFilter {
  organization: string;
  username: string;
  email: string;
  dateJoined: string; 
  phone: string;
  status: string;
}

export interface FilterVisibility {
  organization: boolean;
  username: boolean;
  email: boolean;
  phone: boolean;
  dateJoined: boolean;
  status: boolean;
}