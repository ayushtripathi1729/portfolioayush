import {
  Clock3,
  FileCode2,
  GraduationCap,
  Newspaper,
  Trophy,
  BriefcaseBusiness,
  Code2,
  Settings,
  ImageIcon,
  User,
  FlaskConical,
  Link2,
} from "lucide-react";

import {
  activityService,
} from "@/services/activity.service";



function formatTime(
  date: Date
) {

  const diff =
    Date.now() - date.getTime();


  const seconds =
    Math.floor(
      diff / 1000
    );


  const minutes =
    Math.floor(
      seconds / 60
    );


  const hours =
    Math.floor(
      minutes / 60
    );


  const days =
    Math.floor(
      hours / 24
    );



  if (days > 0) {

    return `${days} day${days > 1 ? "s" : ""} ago`;

  }



  if (hours > 0) {

    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  }



  if (minutes > 0) {

    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  }



  return "Just now";

}





function getActivityIcon(
  entity: string
) {


  const icons: Record<string, React.ReactNode> = {


    Project:
      <FileCode2 className="size-4" />,


    Education:
      <GraduationCap className="size-4" />,


    Blog:
      <Newspaper className="size-4" />,


    Achievement:
      <Trophy className="size-4" />,


    Experience:
      <BriefcaseBusiness className="size-4" />,


    Skill:
      <Code2 className="size-4" />,


    Research:
      <FlaskConical className="size-4" />,


    Technology:
      <Code2 className="size-4" />,


    Asset:
      <ImageIcon className="size-4" />,


    Setting:
      <Settings className="size-4" />,


    User:
      <User className="size-4" />,


    SocialLink:
      <Link2 className="size-4" />,


  };


  return (
    icons[entity] ??
    <Clock3 className="size-4" />
  );

}





function getActionColor(
  action: string
) {


  switch(action) {


    case "CREATE":

      return "bg-green-500";


    case "UPDATE":

      return "bg-blue-500";


    case "DELETE":

      return "bg-red-500";


    default:

      return "bg-primary";

  }

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

              Your portfolio changes will appear here.

            </p>


          </div>


        ) : (


          <div className="mt-6 space-y-6">


            {
              activities.map(
                (activity) => (

                  <div
                    key={activity.id}
                    className="flex gap-4"
                  >


                    <div
                      className={`
                        flex size-9 shrink-0
                        items-center justify-center
                        rounded-full text-white
                        ${getActionColor(activity.action)}
                      `}
                    >

                      {
                        getActivityIcon(
                          activity.entity
                        )
                      }

                    </div>




                    <div className="space-y-1">


                      <p className="text-sm font-medium">

                        {activity.description}

                      </p>



                      <p className="text-xs text-muted-foreground">

                        {formatTime(
                          activity.createdAt
                        )}

                      </p>


                    </div>


                  </div>


                )
              )
            }


          </div>


        )
      }


    </div>

  );

}