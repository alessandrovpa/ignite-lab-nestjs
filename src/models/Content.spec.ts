import { Content } from './Content';

describe('Content Model', () => {
  it('should be able to create a new content object with 5 or more characters', () => {
    const contentWith5Characters = 'abcde';
    const result = new Content(contentWith5Characters);

    expect(result).toBeTruthy();
  });

  it('should be able to create a new content object with 120 or less characters', () => {
    const contentWith120Characters = 'a'.repeat(120);
    const result = new Content(contentWith120Characters);

    expect(result).toBeTruthy();
  });

  it('should not be able to create a new content object less than 5 characters', () => {
    const invalidContent = 'abcd';

    expect(() => new Content(invalidContent)).toThrow();
  });

  test('should not be able to create a new content object more than 120 characters', () => {
    const invalidContent = 'a'.repeat(121);

    expect(() => new Content(invalidContent)).toThrow();
  });
});
