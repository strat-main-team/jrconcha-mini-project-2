export default async function Home() {
  const tempContent = [];
  for (let i = 0; i < 100; i++) {
    tempContent.push(<h1>adas</h1>);
  }
  return <div>{tempContent}</div>;
}
