import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface NavigationOptions {
  params?: { [key: string]: string };
}

const useRouting = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const location = useLocation();

  const getParams = (id: string) => {
    return searchParams.get(id);
  };

  const setParams = (id: string, value: string) => {
    if (id && value !== "") {
      searchParams.set(id, value);
      setSearchParams(searchParams);
    } else {
      setSearchParams("");
    }
  };

  const navigateTo = (URL: string, { params }: NavigationOptions = {}) => {
    navigate({ pathname: URL, search: params ? new URLSearchParams(params).toString() : "" });
  };

  const getCurrentURL = () => {
    return location.pathname;
  };

  return {
    getParams,
    setParams,
    navigateTo,
    getCurrentURL,
  };
};

export default useRouting;
