import { ConfigModule } from '@nestjs/config';
import { User } from 'src/Users/domain/entities/User';
import { UserRepository } from 'src/Users/domain/repository/user.repository';
import { DataSource } from 'typeorm';




export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        url: process.env.database_config,
        logging: true,
        entities: [
          User
        ],
        synchronize: true,
      })
      return dataSource.initialize();
    },
  },
];