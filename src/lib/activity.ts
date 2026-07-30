import { activityService } from "@/services/activity.service";


interface LogActivityInput {

  action: string;

  entity: string;

  entityId?: string;

  description: string;

}



export async function logActivity(
  data: LogActivityInput
) {

  try {

    await activityService.create(data);


  } catch (error) {

    console.error(
      "Activity logging failed:",
      error
    );

  }

}