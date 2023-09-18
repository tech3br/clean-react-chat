import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export const makeCreateConversationValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('user_ids').required().build(),
  ]);
};
