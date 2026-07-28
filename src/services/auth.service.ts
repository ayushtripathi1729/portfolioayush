import { verifyPassword } from "@/lib/password";
import { userRepository } from "@/repositories/user.repository";

export class AuthService {
  async authenticate(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    const validPassword = await verifyPassword(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export const authService = new AuthService();