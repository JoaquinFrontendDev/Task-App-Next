interface LayoutProps {
  children: React.ReactElement | React.ReactElement[];
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-slate-100 max-w-screen flex min-h-screen w-full">
      <div className="max-w-[1100px] mx-auto flex flex-col mb-3 w-full px-8 lg:scroll-px-0">{children}</div>
    </div>
  );
}

export default Layout;
