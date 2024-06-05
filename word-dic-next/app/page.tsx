import getWordDB from './utils/getWordDB';
import ClientHome from './client-cpn/ClientHome';

export default async function Home() {

  const basicWordData = await getWordDB()

  return (
    <ClientHome
      basicWordData={basicWordData}
    />
  )
};