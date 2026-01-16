import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Logger
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
    private readonly logger = new Logger(ExpensesController.name);
    constructor(private readonly expensesService: ExpensesService) { }

    @Get()
    findAll() {
        this.logger.log('Se ha accedido al listado de gastos (GET /expenses)');
        return this.expensesService.findAll();
    }

    @Post()
    create(@Body() createUserDto: CreateExpenseDto) {
        return this.expensesService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateExpenseDto) {
        return this.expensesService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.logger.log('Se ha accedido a eliminacion (DELETE /expenses/' + id + ')');
        return this.expensesService.remove(+id);
    }
}