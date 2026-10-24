"use client";

import * as React from "react";
import { FileBarChart, Play, Plus } from "lucide-react";
import { reportsList } from "@/data/dummy/analytics";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { SearchInput } from "@/components/ui/search-input";
import { EmptyState } from "@/components/ui/states";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";

const CATEGORY_TABS = [
  { value: "all", label: "All" },
  { value: "Sales", label: "Sales" },
  { value: "Customers", label: "Customers" },
  { value: "Inventory", label: "Inventory" },
  { value: "Marketing", label: "Marketing" },
];

export function ReportsView() {
  const { toast } = useToast();
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("all");

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return reportsList.filter((r) => {
      const matchesCategory = category === "all" || r.category === category;
      const matchesSearch =
        q.length === 0 ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Build, save and export detailed reports."
        actions={
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New report
          </Button>
        }
      />

      <div className="flex flex-col gap-4">
        <SearchInput
          className="w-full max-w-sm"
          value={search}
          onChange={setSearch}
          placeholder="Search reports…"
        />
        <Tabs tabs={CATEGORY_TABS} value={category} onValueChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={<FileBarChart className="h-6 w-6" />}
            title="No reports found"
            description="Try a different search term or category filter."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((report) => (
            <Card key={report.id} className="flex flex-col">
              <CardContent className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <FileBarChart className="h-5 w-5" />
                  </div>
                  <Badge tone="primary">{report.category}</Badge>
                </div>
                <p className="mt-4 font-medium text-foreground">{report.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-xs text-muted-foreground">
                  Updated {formatDate(report.updatedAt, "short")}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Play className="h-3.5 w-3.5" />}
                  onClick={() =>
                    toast({
                      tone: "success",
                      title: "Report running",
                      description: `“${report.name}” is being generated.`,
                    })
                  }
                >
                  Run report
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
