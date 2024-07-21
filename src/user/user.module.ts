import {Module} from "@nestjs/common";
import {UserController} from "./controller/user.controller";
import {UserService} from "./service/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./repository/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}