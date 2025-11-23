import HeaderWithCodeButtons from "./_components/HeaderWithCodeButtons";
import ResponsiveCodeEditor from "./_components/ResponsiveCodeEditor";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0e0e13] font-sans">
      <div className="w-full p-3">
        <HeaderWithCodeButtons />
        <ResponsiveCodeEditor />
      </div>
    </main>
  );
}