import Translator from "@/components/translator";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24 gradient-bg">
      <div className="w-full max-w-5xl">
        <header className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6868e1] to-[#4264e6] bg-clip-text text-transparent">
            Modern Translator
          </h1>
          <p className="text-gray-500 animate-fade-in mt-2">
            Fast, free and accurate translation
          </p>
        </header>
        <Translator />
      </div>
    </main>
  );
}
