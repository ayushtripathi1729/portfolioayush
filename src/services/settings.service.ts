import { Prisma } from "../../generated/prisma/client";

import { settingRepository } from "@/repositories/settings.repository";
import { logActivity } from "@/lib/activity";



export class SettingService {



  async getAll() {

    return settingRepository.findAll();

  }





  async getById(
    id: string
  ) {

    return settingRepository.findById(
      id
    );

  }





  async getByUserId(
    userId: string
  ) {

    return settingRepository.findByUserId(
      userId
    );

  }





  async create(
    data: Prisma.SettingCreateInput
  ) {


    const settings =
      await settingRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Setting",

      entityId: settings.id,

      description:
        "Created portfolio settings",

    });



    return settings;

  }








  async update(
    id: string,
    data: Prisma.SettingUpdateInput
  ) {


    const settings =
      await settingRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Setting",

      entityId: settings.id,

      description:
        "Updated portfolio settings",

    });



    return settings;

  }








  async updateByUserId(
    userId: string,
    data: Prisma.SettingUpdateInput
  ) {


    const settings =
      await settingRepository.updateByUserId(
        userId,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Setting",

      entityId: settings.id,

      description:
        "Updated portfolio settings",

    });



    return settings;

  }








  async upsert(
    userId: string,
    create: Prisma.SettingCreateInput,
    update: Prisma.SettingUpdateInput
  ) {


    const settings =
      await settingRepository.upsert(
        userId,
        create,
        update
      );



    await logActivity({

      action: "UPDATE",

      entity: "Setting",

      entityId: settings.id,

      description:
        "Updated portfolio configuration",

    });



    return settings;

  }








  async delete(
    id: string
  ) {


    const deleted =
      await settingRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Setting",

      entityId: id,

      description:
        "Deleted portfolio settings",

    });



    return deleted;

  }








  async count() {

    return settingRepository.count();

  }


}





export const settingService =
  new SettingService();


export const settingsService =
  settingService;