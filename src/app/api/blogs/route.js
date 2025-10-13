import { NextRequest, NextResponse } from "next/server";
import { blogs } from "@/.velite/generated";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const pageParam = searchParams.get("page");
  const sortByParam = searchParams.get("sortBy");
  const orderParam = searchParams.get("order");

  const POSTS_PER_PAGE = Math.min(parseInt(limitParam || "10", 10), 25);
  const currentPage = Math.max(parseInt(pageParam || "1", 10), 1);
  const sortBy = sortByParam || "publishedAt";
  const order = orderParam === "asc" ? "asc" : "desc";

  let sortedBlogs = [...blogs];

  if (sortBy === "publishedAt" || sortBy === "updatedAt") {
    sortedBlogs.sort((a, b) => {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();

      if (order === "desc") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }

  const totalPosts = sortedBlogs.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  const paginatedBlogs = sortedBlogs.slice(skip, skip + POSTS_PER_PAGE);

  const data = paginatedBlogs.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    url: `/blog/${post.slug}`,
    imageSrc: post.image.src,
  }));

  return NextResponse.json({
    data: data,
    pagination: {
      totalPosts,
      totalPages,
      currentPage,
      limit: POSTS_PER_PAGE,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  });
}
