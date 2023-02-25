
import { DataSource, Repository } from 'typeorm';
import { User } from '../domain/entities/User';

export const userProviders = [
  {
    provide: 'user_repository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];