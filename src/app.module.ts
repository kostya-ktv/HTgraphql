import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig,  } from '@nestjs/apollo';
import { join } from 'path';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'Admin',
      autoLoadEntities: true,
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.qql'),
    // schema.qql change default Float to integer while definition a number type fields
    //   buildSchemaOptions: {
    //     numberScalarMode: 'integer'
    // }
    }),
    CoffeesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
