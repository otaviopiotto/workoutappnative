import { toast } from "react-toastify";
import api from "../services/api";

const uploadImage = async (data: any, id: string) => {
  const file = new FormData();

  return await fetch(data).then(async (e) => {
    const blob = await e.blob();

    const newFile = new File([blob], "profile-picture.jpg", {
      type: "image/jpeg",
    });
    file.append("file", newFile);
    file.append("id", id);
    console.log(newFile);

    try {
      await api.post(`/user/upload/image/${id}`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Upload realizado com sucesso!");
      return true;
    } catch (error: any) {
      toast.error(error.message);
    }
  });
};

export default uploadImage;
