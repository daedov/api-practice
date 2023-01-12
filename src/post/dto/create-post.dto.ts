import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    published: boolean;
}
