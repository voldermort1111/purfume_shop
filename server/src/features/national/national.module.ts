import { NationalService } from './data-access/national.service';
import { NationalRepository } from './data-access/national.repository';
import { NationalController } from './national.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([NationalRepository])],
	controllers: [NationalController],
	providers: [NationalService],
	exports: [NationalService],
})
export class NationalModule {}
