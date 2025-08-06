// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // this will immediately send anyone hitting “/” over to “/overview”
  redirect("/overview");
}
