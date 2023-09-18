import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('username').required().build(),
    ...ValidationBuilder.field('password').required().min(3).build(),
  ]);
};
