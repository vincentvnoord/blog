import QueryProvider from "@/components/query-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}

