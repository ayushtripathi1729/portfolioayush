import { AssetType, Prisma } from "../../generated/prisma/client";

import { assetRepository } from "@/repositories/asset.repository";

export class AssetService {
  async getAll() {
    return assetRepository.findAll();
  }

  async getById(id: string) {
    return assetRepository.findById(id);
  }

  async getByType(type: AssetType) {
    return assetRepository.findByType(type);
  }

  async getImages() {
    return assetRepository.findImages();
  }

  async getDocuments() {
    return assetRepository.findDocuments();
  }

  async create(data: Prisma.AssetCreateInput) {
    return assetRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.AssetUpdateInput
  ) {
    return assetRepository.update(id, data);
  }

  async delete(id: string) {
    return assetRepository.delete(id);
  }

  async count() {
    return assetRepository.count();
  }
}

export const assetService = new AssetService();