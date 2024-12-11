import { Priority } from "@/constants";
import { PriorityGeneric } from "@/app/priority/generic";

export default function UrgentPriorityPage() {
  return <PriorityGeneric priority={Priority.Urgent} />;
}
