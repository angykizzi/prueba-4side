import type { User } from "@/types/User";

export const formatUsers = (users: User[]) => {
  return users.map((user) => ({
    ...user,
    nombreCompleto: `${user.usuarioNombre} ${user.usuarioApellidoPaterno} ${user.usuarioApellidoMaterno}`.trim(),
  }));
};
