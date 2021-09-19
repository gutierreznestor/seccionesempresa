import { useRouter } from "next/router"

const useGetIdParam = () => {
  const { query } = useRouter();
  const id = query.id;
  return id;
};

export default useGetIdParam;
