import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './schema/employee.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Post('feed')
  async feedDummyData(): Promise<Employee[]> {
    return this.employeeService.feed();
  }

  @Get()
  async findAll(@Query() query: ExpressQuery): Promise<Employee[]> {
    return this.employeeService.findAll(query);
  }

  @Get(':empId')
  async findOne(@Param('empId') empId: string) {
    return this.employeeService.findOne(empId);
  }

  @Put(':empId')
  update(
    @Param('empId') empId: string,
    @Body(new ValidationPipe()) updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(empId, updateEmployeeDto);
  }

  @Delete()
  removeAll() {
    return this.employeeService.removeAll();
  }
  @Delete(':empId')
  remove(@Param('empId') empId: string) {
    return this.employeeService.remove(empId);
  }
}
