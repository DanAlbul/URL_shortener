import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback((text, success = undefined) => {
    if (window.M && text) {
      console.log(text);
      window.M.toast({
        html: text,
        classes: `${success ? 'green darken-2' : 'red darken-3'}` || '',
      });
    }
  }, []);
};
