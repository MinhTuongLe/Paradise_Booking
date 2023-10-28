import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import useLoginModel from "./useLoginModal";

function useFavorite({ listingId, currentUser }) {
  const router = useRouter();
  const loginModel = useLoginModel();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    },
    [currentUser, hasFavorite, listingId, loginModel]
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}

export default useFavorite;
