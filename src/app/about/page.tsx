export default async function Home() {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  return (
    <main>
      <h1>Ma page</h1>
    </main>
  );
}
