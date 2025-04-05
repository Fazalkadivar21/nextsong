export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <p className="text-5xl">Hey its Home.tsx</p>
        <a href="/login" className="text-emerald-500">go to login page </a>
        <a href="/signup" className="text-emerald-500">go to signup page</a>
      </div>
    </>
  );
}
