import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type AccentKey =
  | "blue"
  | "violet"
  | "emerald"
  | "orange"
  | "teal"
  | "rose"
  | "indigo";

const accents: Record<
  AccentKey,
  { iconBg: string; iconText: string; topBar: string; linkColor: string }
> = {
  blue:    { iconBg: "bg-blue-100",    iconText: "text-blue-600",    topBar: "bg-blue-500",    linkColor: "group-hover:text-blue-600"    },
  violet:  { iconBg: "bg-violet-100",  iconText: "text-violet-600",  topBar: "bg-violet-500",  linkColor: "group-hover:text-violet-600"  },
  emerald: { iconBg: "bg-emerald-100", iconText: "text-emerald-600", topBar: "bg-emerald-500", linkColor: "group-hover:text-emerald-600" },
  orange:  { iconBg: "bg-orange-100",  iconText: "text-orange-600",  topBar: "bg-orange-500",  linkColor: "group-hover:text-orange-600"  },
  teal:    { iconBg: "bg-teal-100",    iconText: "text-teal-600",    topBar: "bg-teal-500",    linkColor: "group-hover:text-teal-600"    },
  rose:    { iconBg: "bg-rose-100",    iconText: "text-rose-600",    topBar: "bg-rose-500",    linkColor: "group-hover:text-rose-600"    },
  indigo:  { iconBg: "bg-indigo-100",  iconText: "text-indigo-600",  topBar: "bg-indigo-500",  linkColor: "group-hover:text-indigo-600"  },
};

export type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent?: AccentKey;
};

export function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  accent = "blue",
}: ToolCardProps) {
  const a = accents[accent];

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200">
      {/* Colored top strip */}
      <div className={`h-1 w-full ${a.topBar}`} />

      <CardHeader className="pb-3 pt-5">
        <div
          className={`mb-3 flex size-11 items-center justify-center rounded-xl ${a.iconBg} ${a.iconText} transition-transform duration-200 group-hover:scale-110`}
        >
          <Icon className="size-5" aria-hidden />
        </div>
        <CardTitle className="text-[#111827]">{title}</CardTitle>
        <CardDescription className="text-pretty leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto pt-2 pb-5">
        <Link
          href={href}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow w-full justify-center ${a.linkColor}`}
        >
          Open Tool
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </CardContent>
    </Card>
  );
}
