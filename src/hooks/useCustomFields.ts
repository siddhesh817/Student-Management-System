import useSWR, { mutate } from 'swr';
import { CustomField } from '@/types';
import { 
  getCustomFields, 
  addCustomField as addFieldToStorage, 
  updateCustomField as updateFieldInStorage,
  deleteCustomField as deleteFieldFromStorage 
} from '@/lib/localStorage';

const FIELDS_KEY = 'customFields';

// Fetcher function for SWR
const fetcher = (): CustomField[] => getCustomFields();

export const useCustomFields = () => {
  const { data: customFields = [], error, isLoading } = useSWR<CustomField[]>(
    FIELDS_KEY,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const addCustomField = (field: Omit<CustomField, 'id'>) => {
    const newField: CustomField = {
      ...field,
      id: `cf-${Date.now()}`,
    };
    addFieldToStorage(newField);
    mutate(FIELDS_KEY);
  };

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    updateFieldInStorage(id, updates);
    mutate(FIELDS_KEY);
  };

  const deleteCustomField = (id: string) => {
    deleteFieldFromStorage(id);
    mutate(FIELDS_KEY);
  };

  const refreshFields = () => {
    mutate(FIELDS_KEY);
  };

  return {
    customFields,
    isLoading,
    error,
    addCustomField,
    updateCustomField,
    deleteCustomField,
    refreshFields,
  };
};
