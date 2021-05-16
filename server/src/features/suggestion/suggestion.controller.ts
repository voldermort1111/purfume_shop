import { SuggestionService } from './data-access/suggestion.service';
import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Suggestion')
@Controller('suggestion')
export class SuggestionController {
	constructor(private readonly suggestionService: SuggestionService) {}

	@Get()
	@ApiBearerAuth()
	productSuggestion(@Request() req) {
		return this.suggestionService.getProductSuggestion(req?.user?.userId);
	}
}
