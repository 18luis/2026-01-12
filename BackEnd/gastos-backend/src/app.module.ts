import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '//db.kiooskwyvuywuigryfjl.supabase.co',
      port: 5432,
      username: 'postgres',
      password: '$PassJIO26$%',
      database: 'expenses_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo
    }),
    ExpensesModule,
  ],
})
export class AppModule {}