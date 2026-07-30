import { Prisma } from "../../generated/prisma/client";

import { socialLinkRepository } from "@/repositories/social-link.repository";
import { logActivity } from "@/lib/activity";



export class SocialLinkService {



  async getAll() {

    return socialLinkRepository.findAll();

  }





  async getBySettingId(
    settingId: string
  ) {

    return socialLinkRepository.findBySettingId(
      settingId
    );

  }





  async getById(
    id: string
  ) {

    return socialLinkRepository.findById(
      id
    );

  }





  async create(
    data:
      | Prisma.SocialLinkCreateInput
      | Prisma.SocialLinkUncheckedCreateInput
  ) {


    const socialLink =
      await socialLinkRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "SocialLink",

      entityId: socialLink.id,

      description:
        `Added social link "${socialLink.platform}"`,

    });



    return socialLink;

  }








  async update(
    id: string,
    data: Prisma.SocialLinkUpdateInput
  ) {


    const socialLink =
      await socialLinkRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "SocialLink",

      entityId: socialLink.id,

      description:
        `Updated social link "${socialLink.platform}"`,

    });



    return socialLink;

  }








  async delete(
    id: string
  ) {


    const socialLink =
      await socialLinkRepository.findById(
        id
      );



    const deleted =
      await socialLinkRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "SocialLink",

      entityId: id,

      description:
        socialLink
          ? `Removed social link "${socialLink.platform}"`
          : "Removed social link",

    });



    return deleted;

  }


}





export const socialLinkService =
  new SocialLinkService();