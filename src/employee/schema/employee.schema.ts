import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Employee {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  gender: 'M' | 'F';

  @Prop()
  photo: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
