import { Priority } from "@/constants";
import { PriorityGeneric } from "@/app/priority/generic";

export default function MediumPriorityPage() {
  return <PriorityGeneric priority={Priority.Medium} />;
}
