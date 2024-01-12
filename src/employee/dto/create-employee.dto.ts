import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateEmployeeDto {
  @Length(6, 10)
  firstName: string;

  @Length(6, 10)
  @IsAlpha()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEnum(['M', 'F'], { message: 'Please provide valid gender' })
  gender: 'M' | 'F';

  // photo: string;
}
