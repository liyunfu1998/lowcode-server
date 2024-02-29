import { Test, TestingModule } from '@nestjs/testing';
import { DevopsController } from './devops.controller';
import { DevopsService } from './devops.service';

describe('DevopsController', () => {
  let devopsController: DevopsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DevopsController],
      providers: [DevopsService],
    }).compile();

    devopsController = app.get<DevopsController>(DevopsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(devopsController.getHello()).toBe('Hello World!');
    });
  });
});
