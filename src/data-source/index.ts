import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const getConnectionOptions = () => {
  const connectionOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.NODE_ENV === 'test' ? 'test_db' : process.env.DB_NAME || 'starter_db',
    synchronize: false,
    logging: false,
    entities: [__dirname + '/../entity/*.js'],
    migrations: [__dirname + '/../migration/*.js'],
  };
  return connectionOptions;
};

const runner = () => {
  return new DataSource(getConnectionOptions());
};

const AppDataSource = runner();
export default AppDataSource;