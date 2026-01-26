"use client";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";


export default function ZapsList() {
    const [data, setData] = useState<{ name: string, id: string, description: string, userId: string }[] | []>([]);

    useEffect(() => {
        const fetchZaps = async () => {
            const res = await axiosInstance.get("/zap");
            setData(res.data);
        };
        fetchZaps();
    }, []);

    return (
        <div>
            {data?.map((zap) => (
                <Card key={zap.id}>
                    <CardHeader>
                        <CardTitle>{zap.name}</CardTitle>
                        <CardDescription>{zap.description}</CardDescription>
                        <CardAction render={<Button>Delete</Button>} />
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}