export default function VaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Nested layouts in Next.js should only return content, not HTML structure
  // The root layout already provides <html> and <body> tags
  return <>{children}</>;
}
