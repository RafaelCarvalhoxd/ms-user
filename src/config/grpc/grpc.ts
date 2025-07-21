import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { makeUser } from '@/factories/user';
import { ICreateUserRequest, IFindByEmailRequest, IUserResponse } from './interfaces/user';
import env from '../env/env';
import { createUserSchema, findByEmailSchema } from '@/dto/user';

const PROTO_PATH = path.join('proto', 'service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const service = protoDescriptor.user as any;

const userService = makeUser();

const server = new grpc.Server();

export function startGrpcServer() {
  server.addService(service.UserService.service, {
    FindByEmail: async (
      call: grpc.ServerUnaryCall<IFindByEmailRequest, IUserResponse>,
      callback: grpc.sendUnaryData<IUserResponse>,
    ) => {
      try {
        const validation = findByEmailSchema.safeParse(call.request);
        if (!validation.success) {
          const errors = validation.error.issues.map((issue) => issue.message).join(', ');
          callback({ code: grpc.status.INVALID_ARGUMENT, message: `Validation error: ${errors}` }, null);
          return;
        }

        const user = await userService.findByEmail(call.request.email);
        if (!user) {
          callback({ code: grpc.status.NOT_FOUND, message: 'User not found' }, null);
          return;
        }
        const response: IUserResponse = {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
        };
        callback(null, response);
      } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: (error as Error).message }, null);
      }
    },
    Create: async (
      call: grpc.ServerUnaryCall<ICreateUserRequest, IUserResponse>,
      callback: grpc.sendUnaryData<IUserResponse>,
    ) => {
      try {
        const validation = createUserSchema.safeParse(call.request);
        if (!validation.success) {
          const errors = validation.error.issues.map((issue) => issue.message).join(', ');
          callback({ code: grpc.status.INVALID_ARGUMENT, message: `Validation error: ${errors}` }, null);
          return;
        }

        const user = await userService.create(
          call.request.name,
          call.request.email,
          call.request.password,
          new Date(call.request.birth_date),
          call.request.phone_number,
          call.request.gender,
        );
        const response: IUserResponse = {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
        };
        callback(null, response);
      } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: (error as Error).message }, null);
      }
    },
  });

  const port = env.grpc.port;
  const host = env.grpc.host;

  server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
    if (error) {
      console.error('❌ Failed to bind gRPC server:', error);
      return;
    }
    console.log(`✅ gRPC server terapie at ${host}:${boundPort}`);
  });
}

export function stopGrpcServer() {
  server.forceShutdown();
}

export { server, service };
