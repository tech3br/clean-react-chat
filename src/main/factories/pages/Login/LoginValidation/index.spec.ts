import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';
import { makeLoginValidation } from '.';

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('username').required().build(),
        ...ValidationBuilder.field('password').required().min(3).build(),
      ])
    );
  });
});
