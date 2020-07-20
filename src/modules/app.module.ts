import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AuthController } from '../controllers/auth/auth.controller';
import { UsersController } from '../controllers/users/users.controller';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWD'),
          database: config.get('DB_NAME'),
          entities: ['dist/entities/*.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
    AuthModule,
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
