import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './schema/employee.schema';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
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

  @Delete(':empId')
  remove(@Param('empId') empId: string) {
    return this.employeeService.remove(empId);
  }
}
