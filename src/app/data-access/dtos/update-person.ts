import { CreatePersonDto } from './create-person';

export interface UpdatePersonDto extends Partial<CreatePersonDto> {}
