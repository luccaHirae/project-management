import { Priority } from "@/constants";
import { PriorityGeneric } from "@/app/priority/generic";

export default function BacklogPriorityPage() {
  return <PriorityGeneric priority={Priority.Backlog} />;
}
