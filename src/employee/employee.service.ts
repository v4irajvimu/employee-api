import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import mongoose from 'mongoose';
import dummyData from '../dummy-data/dummyData';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schema/employee.schema';

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

  async feed() {
    try {
      const data = await this.employeeModel.insertMany(dummyData);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: Query) {
    console.log(query);
    const terms = query.term
      ? {
          $or: [
            {
              firstName: {
                $regex: query.term,
                $options: 'i',
              },
            },
            {
              lastName: {
                $regex: query.term,
                $options: 'i',
              },
            },
          ],
        }
      : {};

    const sortByText = query.sort ?? '';
    let sortBy = {};
    if (String(sortByText).split('-').length === 2) {
      switch (sortByText) {
        case 'firstName-asc':
          sortBy = { firstName: 1 };
          break;
        case 'firstName-dsc':
          sortBy = { firstName: -1 };
          break;
        case 'lastName-asc':
          sortBy = { lastName: 1 };
          break;
        case 'lastName-dsc':
          sortBy = { lastName: -1 };
          break;
        case 'email-asc':
          sortBy = { email: 1 };
          break;
        case 'email-dsc':
          sortBy = { email: -1 };
          break;
        case 'phoneNumber-dsc':
          sortBy = { phoneNumber: -1 };
          break;
        case 'phoneNumber-asc':
          sortBy = { phoneNumber: 1 };
          break;
        case 'gender-dsc':
          sortBy = { gender: -1 };
          break;
        case 'gender-asc':
          sortBy = { gender: 1 };
          break;
        default:
          sortBy = { firstName: 1 };
          break;
      }
    }

    const employees = await this.employeeModel
      .find({ ...terms })
      .sort({ ...sortBy });
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

  async removeAll() {
    return await this.employeeModel.deleteMany({});
  }
}
