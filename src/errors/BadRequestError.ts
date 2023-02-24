import { errorMessages } from '../utils/constants';

export default class extends Error {
  statusCode;

  constructor(message: string = errorMessages.badRequestError) {
    super(message);
    this.statusCode = 400;
  }
}
