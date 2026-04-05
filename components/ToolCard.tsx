import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function ToolCard({ title, description, href, icon: Icon }: ToolCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/80">
      <CardHeader className="pb-2">
        <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-[#2563EB]/8 text-[#2563EB] transition-colors group-hover:bg-[#2563EB]/12">
          <Icon className="size-6" aria-hidden />
        </div>
        <CardTitle className="text-[#2563EB]">{title}</CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-4">
        <Button variant="secondary" className="w-full touch-manipulation" asChild>
          <Link href={href}>Open Tool</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
