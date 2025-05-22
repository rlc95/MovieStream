import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const skip = (page - 1) * limit;

    const collection = db.collection("movies_n");

    const [movies, totalCount] = await Promise.all([
      collection.find(query)
        .sort({ metacritic: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),

      collection.countDocuments(query),
    ]);

    return NextResponse.json({
      data: movies,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      page,
    });
  } catch (error) {
    console.error("MONGODB ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
