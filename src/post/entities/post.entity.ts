import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@prisma/client";

export class PostEntity implements Post {
    @ApiProperty({ default: 1 })
    id: number;
    @ApiProperty({ default: 'The Cat' })
    title: string;
    @ApiProperty({ default: 'The cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae.' })
    content: string;
    @ApiProperty({ default: true })
    published: boolean;
}
