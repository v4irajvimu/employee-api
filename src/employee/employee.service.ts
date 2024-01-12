import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schema/employee.schema';
import mongoose from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: mongoose.Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee = await this.employeeModel.create(createEmployeeDto);
      return newEmployee;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const employees = await this.employeeModel.find();
    return employees;
  }

  async findOne(id: string) {
    try {
      const employee = await this.employeeModel.findById(id);
      return employee;
    } catch (error) {
      throw new NotFoundException('employee not found!');
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeeModel.findByIdAndUpdate(
        id,
        updateEmployeeDto,
        { new: true, runValidators: true },
      );
      return employee;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    return await this.employeeModel.findByIdAndDelete(id);
  }
}
