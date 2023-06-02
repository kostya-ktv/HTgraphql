import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig,  } from '@nestjs/apollo';
import { join } from 'path';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
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
