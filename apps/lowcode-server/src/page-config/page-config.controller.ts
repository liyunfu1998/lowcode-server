import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageConfigService } from './page-config.service';
import { CreatePageConfigDto } from './dto/create-page-config.dto';
import { UpdatePageConfigDto } from './dto/update-page-config.dto';

@Controller('page-config')
export class PageConfigController {
  constructor(private readonly pageConfigService: PageConfigService) {}

  @Post()
  create(@Body() createPageConfigDto: CreatePageConfigDto) {
    return this.pageConfigService.create(createPageConfigDto);
  }

  @Get()
  findAll() {
    return this.pageConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageConfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageConfigDto: UpdatePageConfigDto) {
    return this.pageConfigService.update(+id, updatePageConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageConfigService.remove(+id);
  }
}
