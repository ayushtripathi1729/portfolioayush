import {
  Clock3,
} from "lucide-react";

import {
  activityService,
} from "@/services/activity.service";


function formatTime(date: Date) {

  return new Intl.RelativeTimeFormat(
    "en",
    {
      numeric: "auto",
    }
  ).format(

    Math.round(
      (date.getTime() - Date.now()) /
      1000 /
      60
    ),

    "minute"

  );

}



export async function RecentActivity() {


  const activities =
    await activityService.getRecent(5);



  return (

    <div className="rounded-xl border bg-card p-6 shadow-sm">


      <div className="flex items-center gap-2">

        <Clock3 className="size-5 text-muted-foreground" />


        <h2 className="text-lg font-semibold tracking-tight">

          Recent Activity

        </h2>


      </div>





      {
        activities.length === 0 ? (


          <div className="mt-8 flex flex-col items-center justify-center py-10 text-center">


            <Clock3 className="mb-4 size-10 text-muted-foreground/60" />


            <h3 className="text-base font-medium">

              No activity yet

            </h3>


            <p className="mt-2 max-w-sm text-sm text-muted-foreground">

              Your recent changes will appear here.

            </p>


          </div>


        ) : (


          <div className="mt-6 space-y-5">


            {
              activities.map((activity)=>(
                
                <div
                  key={activity.id}
                  className="flex gap-3"
                >

                  <div className="mt-1 size-2 rounded-full bg-primary" />


                  <div>

                    <p className="text-sm font-medium">

                      {activity.description}

                    </p>


                    <p className="text-xs text-muted-foreground">

                      {formatTime(activity.createdAt)}

                    </p>


                  </div>


                </div>

              ))
            }


          </div>


        )
      }


    </div>

  );

}