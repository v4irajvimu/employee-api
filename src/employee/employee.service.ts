import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import dummyData from './dummy-data';

@Injectable()
export class EmployeeService {
  private dataList = [...dummyData];

  create(createEmployeeDto: CreateEmployeeDto) {
    return createEmployeeDto;
  }

  findAll() {
    return this.dataList;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return {
      id,
      ...updateEmployeeDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
