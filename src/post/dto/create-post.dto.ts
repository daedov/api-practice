import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'The Cat' })
    title: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'The cat is a domestic species of small carnivorous mammal.' })
    content: string;
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ default: true })
    published: boolean;
}
