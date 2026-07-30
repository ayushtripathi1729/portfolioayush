import { Prisma } from "../../generated/prisma/client";

import { settingRepository } from "@/repositories/settings.repository";


export class SettingService {

  async getAll() {
    return settingRepository.findAll();
  }


  async getById(id: string) {
    return settingRepository.findById(id);
  }


  async getByUserId(userId: string) {
    return settingRepository.findByUserId(userId);
  }


  async create(
    data: Prisma.SettingCreateInput
  ) {
    return settingRepository.create(data);
  }


  async update(
    id: string,
    data: Prisma.SettingUpdateInput
  ) {
    return settingRepository.update(
      id,
      data
    );
  }


  async updateByUserId(
    userId: string,
    data: Prisma.SettingUpdateInput
  ) {
    return settingRepository.updateByUserId(
      userId,
      data
    );
  }


  async upsert(
    userId: string,
    create: Prisma.SettingCreateInput,
    update: Prisma.SettingUpdateInput
  ) {
    return settingRepository.upsert(
      userId,
      create,
      update
    );
  }


  async delete(id: string) {
    return settingRepository.delete(id);
  }


  async count() {
    return settingRepository.count();
  }

}


export const settingService = new SettingService();
export const settingsService = settingService;