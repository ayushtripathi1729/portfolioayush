import { Settings } from "lucide-react";

import { settingsService } from "@/services/settings.service";
import { SettingsForm } from "@/components/admin/settings/settings-form";


export default async function SettingsPage() {

  const settingsList =
    await settingsService.getAll();


  const settings =
    settingsList[0] ?? null;



  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Settings className="size-8 text-primary" />


        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Settings
          </h1>


          <p className="text-muted-foreground">
            Manage portfolio information and configuration.
          </p>

        </div>


      </section>





      <SettingsForm

        settings={{

          siteTitle:
            settings?.siteTitle ?? "",

          siteDescription:
            settings?.siteDescription ?? "",

          fullName:
            settings?.fullName ?? "",

          tagline:
            settings?.tagline ?? "",

          bio:
            settings?.bio ?? "",

          email:
            settings?.email ?? "",

          phone:
            settings?.phone ?? "",

          location:
            settings?.location ?? "",

          profileImageId:
            settings?.profileImageId ?? "",

          resumeAssetId:
            settings?.resumeAssetId ?? "",

        }}

      />


    </div>
  );
}