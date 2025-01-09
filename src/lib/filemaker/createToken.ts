import { FileMakerAuth } from './FileMakerAuth';
import { createFileMakerClient } from './FileMakerClient';

let filemakerClientInstance: ReturnType<typeof createFileMakerClient> | null =
  null;
const JWT_SECRET =
  process.env.NEXT_PUBLIC_JWT_SECRET || 'your-default-secret-key';

export const initializeFileMakerClient = () => {
  if (filemakerClientInstance) {
    return filemakerClientInstance;
  }

  const auth = new FileMakerAuth({
    secret: JWT_SECRET,
  });

  filemakerClientInstance = createFileMakerClient({ auth });
  return filemakerClientInstance;
};

export const getFileMakerClient = () => {
  if (!filemakerClientInstance) {
    return initializeFileMakerClient();
  }
  return filemakerClientInstance;
};
