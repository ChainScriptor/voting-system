import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET() {
    try {
        const db = await createConnection();
        const sql = `SELECT * FROM votes`;
        const [votes] = await db.query<RowDataPacket[]>(sql);
        return NextResponse.json(votes);
    } catch (error) {
        console.error("Error fetching votes:", error);
        return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 });
    }
}
