import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getZapsAction } from "@/actions/zap";
import { DeleteZapDialog } from "./delete-zap-dialog";
import Link from "next/link";

export default function ZapsList() {
  const [data, setData] = useState<
    | { name: string; id: string; description: string | null; userId: string }[]
    | []
  >([]);

  useEffect(() => {
    const fetchZaps = async () => {
      const res = await getZapsAction();
      if (res.data) {
        setData(res.data);
      }
    };
    fetchZaps();
  }, []);

  const handleDeleteSuccess = (id: string) => {
    setData((prev) => prev.filter((zap) => zap.id !== id));
  };

  return (
    <div className="flex flex-col gap-5">
      {data?.map((zap) => (
        <Card key={zap.id}>
          <CardHeader>
            <Link
              className="cursor-pointer group flex flex-col gap-1.5"
              href={`/app/zaps/${zap.id}`}
            >
              <CardTitle className="group-hover:underline">
                {zap.name}
              </CardTitle>
              <CardDescription>
                {zap.description || "No description"}
              </CardDescription>
            </Link>
            <CardAction>
              <DeleteZapDialog
                zapId={zap.id}
                onSuccess={handleDeleteSuccess}
              />
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
