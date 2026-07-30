import { Badge } from "@/components/ui/badge";


interface ProjectStatusBadgeProps {
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED" | string;
}



export function ProjectStatusBadge({
  status,
}: ProjectStatusBadgeProps) {


  const config: Record<
    string,
    {
      label: string;
      variant:
        | "default"
        | "secondary"
        | "outline"
        | "destructive";
    }
  > = {

    PUBLISHED: {
      label: "Published",
      variant: "default",
    },


    DRAFT: {
      label: "Draft",
      variant: "secondary",
    },


    ARCHIVED: {
      label: "Archived",
      variant: "outline",
    },

  };



  const current =
    config[status] ?? {
      label: status,
      variant: "outline",
    };



  return (
    <Badge
      variant={current.variant}
    >
      {current.label}
    </Badge>
  );
}