import { Client } from '@microsoft/microsoft-graph-client';
import { useEffect, useState } from 'react';
import { useAppContext } from './AppContext';

const getListItems = async () => {
  const { authProvider } = useAppContext();
  return authProvider;
};

const useAuthProvider = () => {
  const [authProvider, setAuthProvider] = useState<any>(null);

  useEffect(() => {
    const getAuthProvider = async () => {
      const provider = await getListItems();
      setAuthProvider(provider);
    };

    getAuthProvider();
  }, []);

  return authProvider;
};

const getList = async () => {
  const authProvider = useAuthProvider();

  if (!authProvider) {
    throw new Error('AuthProvider não está disponível');
  }

  const options = {
    authProvider,
  };

  const client = Client.init(options);

  try {
    const list = await client.api('/sites/{site-id}/lists/{list-id}?select=id,name,lastModifiedDateTime&expand=columns(select=name,description),items(expand=fields(select=Name,Color,Quantity))')
      .get();

    console.log('Lista:', list);
    // Faça algo com os dados da lista, como atualizar o estado local para exibição na sua aplicação
  } catch (error) {
    console.error('Erro ao obter lista:', error);
  }
};

export { getList };
