import { FormEvent, useState } from 'react';
import useCreateUser from '@/src/hooks/api/useCreateUser/useCreateUser';
import { toast } from 'react-toastify';
import { DEFAULT_ERROR_MESSAGE } from '@/src/constants/general';
import { TAuthMode } from '@/src/types/TAuthMode';

function useAuthForm() {
  const { request: createUserRequest, isLoading } = useCreateUser();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (event: FormEvent, authMode: TAuthMode) => {
    event.preventDefault();

    if (authMode === 'sign-in') {
      //   login user
    } else {
      createUserRequest({
        data: {
          email,
          password,
        },
        options: {
          onSuccess: () => clearForm(),
          onError: () => toast.error(DEFAULT_ERROR_MESSAGE),
        },
      });
    }
  };

  return {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    handleSubmit,
  };
}

export default useAuthForm;
