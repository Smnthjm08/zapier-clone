import { prisma } from "@repo/db";

export default async function Home() {
  console.log(
    "prisma",
    await prisma.user.findMany({
      select: {
        name: true,
      },
    }),
  );

  return (
    <main className="flex flex-col items-center min-h-screen justify-center">
      <div className="font-black">font black</div>
      <div className="font-extrabold">font extrabold</div>
      <div className="font-bold">font bold</div>
      <div className="font-semibold">font semibold</div>
      <div className="font-medium">font medium</div>
      <div className="font-normal">font extralight</div>
      <div className="font-light">font light</div>
      <div className="font-extralight">font extralight</div>
      <div className="font-thin">font thin</div>
    </main>
  );
}
