import React from "react";

const upload = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsOpen(false);
    const formData = new FormData();
    formData.append("datafiles", file);

    setIsUploadLoading(true);
    const match = document.cookie.match(/CBaccessToken=([^;]+)/);
    const cbToken = match ? match[1] : "";

    try {
      const response = await fetch(`${API_CONSTANTS.BASE_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: cbToken
          ? {
              Authorization: `Bearer ${cbToken}`,
            }
          : {},
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="text-sm font-medium text-gray-700">
            Upload Students File
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="border rounded px-3 py-2"
          />
        </div>
      </form>
    </div>
  );
};

export default upload;
