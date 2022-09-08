interface LayoutProps {
  children: React.ReactElement | React.ReactElement[];
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-slate-100 max-w-screen flex h-full min-h-screen w-full">
      <div className="max-w-[1100px] mx-auto h-full w-full">{children}</div>
    </div>
  );
}

export default Layout;
