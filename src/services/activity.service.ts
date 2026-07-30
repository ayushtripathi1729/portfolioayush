import {
  activityRepository,
} from "@/repositories/activity.repository";


export class ActivityService {


  async create(data: {
    action: string;
    entity: string;
    entityId?: string;
    description: string;
  }) {

    return activityRepository.create(data);

  }




  async getRecent(limit = 10) {

    return activityRepository.findRecent(limit);

  }


}



export const activityService =
  new ActivityService();