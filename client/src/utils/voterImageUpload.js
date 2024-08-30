import axios from "axios";
import toast from "react-hot-toast";
export const uploadFile = async (file) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(
      `http://localhost:3000/api/postVoterImage`,
      formData,
      config
    );
    if (res.data.message == "Image Upload Sucessfull!") {
      toast.success("Image Upload Sucessfull");
    }
  } catch (err) {
    toast.error("Image Upload Failed");
    console.error(err.message);
  }
};
