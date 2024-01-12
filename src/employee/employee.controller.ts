import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':empId')
  findOne(@Param('empId') empId: string) {
    return this.employeeService.findOne(+empId);
  }

  @Patch(':empId')
  update(
    @Param('empId') empId: string,
    @Body(new ValidationPipe()) updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+empId, updateEmployeeDto);
  }

  @Delete(':empId')
  remove(@Param('empId') empId: string) {
    return this.employeeService.remove(+empId);
  }
}
