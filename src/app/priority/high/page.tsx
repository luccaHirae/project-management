import { Priority } from "@/constants";
import { PriorityGeneric } from "@/app/priority/generic";

export default function HighPriorityPage() {
  return <PriorityGeneric priority={Priority.High} />;
}
