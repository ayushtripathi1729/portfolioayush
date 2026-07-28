import { Prisma } from "../../generated/prisma/client";

import { contactMessageRepository } from "@/repositories/contact-message.repository";

export class ContactMessageService {
  async getAll() {
    return contactMessageRepository.findAll();
  }

  async getUnread() {
    return contactMessageRepository.findUnread();
  }

  async getRead() {
    return contactMessageRepository.findRead();
  }

  async getById(id: string) {
    return contactMessageRepository.findById(id);
  }

  async markAsRead(id: string) {
    return contactMessageRepository.markAsRead(id);
  }

  async markAsReplied(id: string) {
    return contactMessageRepository.markAsReplied(id);
  }

  async create(data: Prisma.ContactMessageCreateInput) {
    return contactMessageRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.ContactMessageUpdateInput
  ) {
    return contactMessageRepository.update(id, data);
  }

  async delete(id: string) {
    return contactMessageRepository.delete(id);
  }

  async count() {
    return contactMessageRepository.count();
  }

  async countUnread() {
    return contactMessageRepository.countUnread();
  }
}

export const contactMessageService =
  new ContactMessageService();