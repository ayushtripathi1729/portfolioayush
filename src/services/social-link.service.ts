import { Prisma } from "../../generated/prisma/client";

import { socialLinkRepository } from "@/repositories/social-link.repository";

export class SocialLinkService {
  async getAll() {
    return socialLinkRepository.findAll();
  }

  async getBySettingId(settingId: string) {
    return socialLinkRepository.findBySettingId(
      settingId
    );
  }

  async getById(id: string) {
    return socialLinkRepository.findById(id);
  }

  async create(
    data:
      | Prisma.SocialLinkCreateInput
      | Prisma.SocialLinkUncheckedCreateInput
  ) {
    return socialLinkRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.SocialLinkUpdateInput
  ) {
    return socialLinkRepository.update(
      id,
      data
    );
  }

  async delete(id: string) {
    return socialLinkRepository.delete(id);
  }
}

export const socialLinkService =
  new SocialLinkService();