import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);

  fireEvent.input(input, { target: { value } });
};

export const testElementExists = (fieldName: string): void => {
  expect(screen.queryByTestId(fieldName)).toBeInTheDocument();
};

export const testElementText = (fieldName: string, text: string): void => {
  expect(screen.getByTestId(fieldName)).toHaveTextContent(text);
};

export const testChildCount = (fieldName: string, count: number): void => {
  expect(screen.getByTestId(fieldName).children).toHaveLength(count);
};

export const testButtonIsEnabled = (fieldName: string): void => {
  expect(screen.getByTestId(fieldName)).toBeEnabled();
};
