import { AssetType, Prisma } from "../../generated/prisma/client";

import { assetRepository } from "@/repositories/asset.repository";
import { logActivity } from "@/lib/activity";


export class AssetService {



  async getAll() {

    return assetRepository.findAll();

  }





  async getById(
    id: string
  ) {

    return assetRepository.findById(id);

  }





  async getByType(
    type: AssetType
  ) {

    return assetRepository.findByType(type);

  }





  async getImages() {

    return assetRepository.findImages();

  }





  async getDocuments() {

    return assetRepository.findDocuments();

  }





  async create(
    data: Prisma.AssetCreateInput
  ) {


    const asset =
      await assetRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Asset",

      entityId: asset.id,

      description:
        `Uploaded asset "${asset.originalName}"`,

    });



    return asset;

  }







  async update(
    id: string,
    data: Prisma.AssetUpdateInput
  ) {


    const asset =
      await assetRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Asset",

      entityId: asset.id,

      description:
        `Updated asset "${asset.originalName}"`,

    });



    return asset;

  }







  async delete(
    id: string
  ) {


    const asset =
      await assetRepository.findById(
        id
      );



    const deleted =
      await assetRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Asset",

      entityId: id,

      description:
        asset
          ? `Deleted asset "${asset.originalName}"`
          : "Deleted asset",

    });



    return deleted;

  }







  async count() {

    return assetRepository.count();

  }


}





export const assetService =
  new AssetService();