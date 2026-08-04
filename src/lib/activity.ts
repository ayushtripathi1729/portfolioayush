import { activityService } from "@/services/activity.service";
import { revalidatePath } from "next/cache";


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

    // Every CMS write logs an activity. Invalidate the public layout here so
    // successful CMS changes are visible immediately instead of after ISR.
    revalidatePath("/", "layout");

  } catch (error) {

    console.error(
      "Activity logging failed:",
      error
    );

  }

}
