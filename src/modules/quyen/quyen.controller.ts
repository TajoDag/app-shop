import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { QuyenService } from './quyen.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';




@Controller('quyen')
export class QuyenController {
    constructor(private readonly quyenService: QuyenService) { }

   
    @Get()
    async getAll(@Request() req) {
        return this.quyenService.getAll();
    }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async them(@Body() themQuyenDto: { role: string }) {
        return this.quyenService.themQuyen(themQuyenDto.role );
    }
}
