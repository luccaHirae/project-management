import { Priority } from "@/constants";
import { PriorityGeneric } from "@/app/priority/generic";

export default function LowPriorityPage() {
  return <PriorityGeneric priority={Priority.Low} />;
}
