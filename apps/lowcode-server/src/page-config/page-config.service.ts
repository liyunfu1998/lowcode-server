import { Injectable } from '@nestjs/common';
import { CreatePageConfigDto } from './dto/create-page-config.dto';
import { UpdatePageConfigDto } from './dto/update-page-config.dto';

@Injectable()
export class PageConfigService {
  create(createPageConfigDto: CreatePageConfigDto) {
    return 'This action adds a new pageConfig';
  }

  findAll() {
    return `This action returns all pageConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageConfig`;
  }

  update(id: number, updatePageConfigDto: UpdatePageConfigDto) {
    return `This action updates a #${id} pageConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} pageConfig`;
  }
}
