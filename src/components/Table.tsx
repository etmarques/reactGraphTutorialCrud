import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext"
import { ensureClient, getList } from "./GraphService"

const Table = () => {

  const { authProvider, user } = useAppContext();
  const siteId = '8a15a256-bff1-4fda-9a22-b677afcbd3c8';
  const listId = 'fc5b3a53-3474-463f-94fe-4a314ab45d59';
  const [jsonText, setJsonText] = useState<string>('');
  
  //string de texto com o json obtido pela getlist
  
  const fetchList = async () => {
    
    const myCLient = async () => await ensureClient(authProvider!);
    if (myCLient !== undefined) { 
      try {
        const list = await getList(authProvider!, siteId, listId);
        console.log ('Detalhes da lista: ', list);
        setJsonText(JSON.stringify(list))
      } catch (error) {
          console.error('Deu chablau: ', error)
      }
    }
  };
    
  useEffect(() => {
    if(authProvider !== undefined) {
      fetchList();
    }
  },[authProvider]);
  
  return (
    <>
      <div>{user === undefined ? 'não estou logado': 'a tabela precisa aparecer aqui embaixo'}</div>
      <div>{jsonText}</div>
    </>
  )
}

export default Table