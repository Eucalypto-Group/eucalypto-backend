import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.module';

import { OffersModule } from './offers/offers.modules';
import { CategoriesModule } from './categories/categories.modules';
import { CompaniesModule } from './companies/companies.modules';
import { CommunityModule } from './community/community.module';
import { UsersModule } from './users/users.modules';
import { MailModule } from './mail/mail.module';
import { OauthModule } from './customOauth/oauth.modules';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        GOOGLE_PROJECT_ID: Joi.string().required(),
        GOOGLE_CLIENT_EMAIL: Joi.string().required(),
        GOOGLE_PRIVATE_KEY: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        REDIS_CACHE_TIME_SECONDS: Joi.number().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASS: Joi.string().required(),
        FRONT_HOST: Joi.string().required(),
        LINKEDIN_CLIENT_ID: Joi.string().required(),
        LINKEDIN_CLIENT_SECRET: Joi.string().required(),
      }),
    }),

    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        projectId: configService.get<string>('GOOGLE_PROJECT_ID'),
        credentials: {
          client_email: configService.get<string>('GOOGLE_CLIENT_EMAIL'),
          private_key: decodeURIComponent(
            configService.get<string>('GOOGLE_PRIVATE_KEY'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    OauthModule,
    CommunityModule,
    OffersModule,
    CategoriesModule,
    CompaniesModule,
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
