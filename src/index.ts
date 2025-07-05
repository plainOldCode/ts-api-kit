import 'module-alias/register';
import { build, localIP, port } from './server';

const start = async () => {
  let server = null;
  try {
    server = build();
    await server.listen(port, localIP);
    server?.log.info('Server started successfully');
  } catch (error) {
    server?.log.error(error);
    process.exit(1);
  }
};

start();