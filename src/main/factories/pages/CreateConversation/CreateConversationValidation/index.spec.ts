import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';
import { makeCreateConversationValidation } from '.';

describe('CreateConversationValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeCreateConversationValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('user_ids').required().build(),
      ])
    );
  });
});
