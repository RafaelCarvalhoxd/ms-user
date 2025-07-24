import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import env from '../env/env';

const PROTO_PATH = path.join('proto', 'service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const service = protoDescriptor.example as any;

const server = new grpc.Server();

export function startGrpcServer() {
  const port = env.grpc.port;
  const host = env.grpc.host;

  server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
    if (error) {
      console.error('❌ Failed to bind gRPC server:', error);
      return;
    }
    console.log(`✅ gRPC Server is running at ${host}:${boundPort}`);
  });
}

export function stopGrpcServer() {
  server.forceShutdown();
}

export { server, service };
