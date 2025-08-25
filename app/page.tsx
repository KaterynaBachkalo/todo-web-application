import TodoPage from "@/components/TodoPage";

const Home = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center p-2 gap-6 sm:p-4 sm:gap-8 md:p-8 md:gap-12 2xl:p-20 2xl:gap-16">
      <main className="flex flex-col w-full items-center sm:items-start gap-6 md:gap-8">
        <TodoPage />
      </main>
    </div>
  );
};

export default Home;
