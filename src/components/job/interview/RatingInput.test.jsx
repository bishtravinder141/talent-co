import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingInput from './RatingInput'; // Replace with the actual path

let handleRatingChangeMock;

beforeEach(() => {
  // Mock function that called on rating change
  handleRatingChangeMock = jest.fn();
  render(
    <RatingInput
      name="rating"
      values={[1, 2, 3, 4, 5]}
      selectedValue={3}
      skillName="Your Skill"
      handleRatingChange={handleRatingChangeMock}
    />
  );
});

test('handles rating change correctly', () => {
  // Click on a different rating value
  const ratingInput = screen.getByRole('radio', { name: '4' });
  fireEvent.click(ratingInput);

  expect(handleRatingChangeMock).toHaveBeenCalledWith('rating', 4);
});

test('renders skill name and rating values correctly', () => {
  // Check if skill name is rendered
  const skillNameElement = screen.getByText('Your Skill');
  expect(skillNameElement).toBeInTheDocument();

  // Check if rating values are rendered
  for (let value = 1; value <= 5; value++) {
    const ratingValueElement = screen.getByText(value.toString());
    expect(ratingValueElement).toBeInTheDocument();
  }
});

test('renders the selected rating as checked', () => {
  // Check if the selected rating is rendered as checked
  const selectedRatingInput = screen.getByRole('radio', { name: '3' });
  expect(selectedRatingInput).toBeChecked();
});
