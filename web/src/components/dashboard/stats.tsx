"use client";

import { useTableStore } from "@/application/stores/table-store";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

type Stats = {
  totalPosts: SummaryStat;
  drafts: SummaryStat;
  published: SummaryStat;
}

type SummaryStat = {
  label: "Drafts" | "Total Posts" | "Published";
  value: number;
}

export const Statistics = () => {
  const { posts } = useTableStore();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let publishedCount = 0;

    for (const post of posts) {
      if (post.published_at) {
        publishedCount++;
      }
    }

    const total = posts.length;

    const drafts: SummaryStat = {
      label: "Drafts",
      value: total - publishedCount,
    }
    const totalPosts: SummaryStat = {
      label: "Total Posts",
      value: total,
    }
    const published: SummaryStat = {
      label: "Published",
      value: publishedCount,
    }

    setTimeout(() =>
      setStats({
        totalPosts,
        drafts,
        published
      })
      , 500);

  }, [posts])

  return (
    <motion.div
      transition={{ staggerChildren: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {
        stats !== null && (<>
          <StatisticCard {...stats?.totalPosts} />
          <StatisticCard {...stats?.drafts} />
          <StatisticCard {...stats?.published} />
        </>
        )
      }
    </motion.div>
  )
}

const StatisticCard = ({ value, label }: SummaryStat) => {
  let color = "bg-blue-100 text-blue-800 border-blue-200";

  if (label === "Drafts")
    color = "bg-yellow-100 text-yellow-800 border-yellow-400";

  if (label === "Published")
    color = "bg-green-200 text-green-800 border-green-400";

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div
        className={`p-4 overflow-hidden rounded-lg border shadow-xs ${color}`}
      >
        <div className="text-sm font-semibold text-gray-600">{label}</div>
        <div className={`mt-1 text-2xl font-semibold`}>{value}</div>
      </div>
    </motion.div>
  )
}
