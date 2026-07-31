import { activityService } from "@/services/activity.service";


type ActivityAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "UPLOAD"
  | "LOGIN"
  | "PASSWORD_CHANGE";


interface LogActivityInput {

  action: ActivityAction;

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