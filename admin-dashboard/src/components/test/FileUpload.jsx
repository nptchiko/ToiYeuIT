import { FILE_TYPES } from "../../Constants/test-constants";
import { parseJsonFile } from "../../utils/test-utils";
import { Upload, FileText, Check, X } from "lucide-react";
import { useRef } from "react";

export default function FileUpload({
  newTest,
  setNewTest,
  updateTestFromFile,
}) {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === FILE_TYPES.JSON || file.name.endsWith(".json")) {
      setNewTest((prev) => ({
        ...prev,
        file: file,
        fileName: file.name,
      }));

      try {
        const fileData = await parseJsonFile(file);
        updateTestFromFile(fileData);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        alert(error.message);
        e.target.value = null;
      }
    } else {
      alert("Please upload a JSON file");
      e.target.value = null;
    }
  };

  const removeFile = () => {
    setNewTest((prev) => ({
      ...prev,
      file: null,
      fileName: "",
      parsedData: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Upload Test File (JSON)
      </label>
      <div
        onClick={handleFileClick}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${
            newTest.file
              ? "border-primary/50 bg-primary/5 shadow-inner"
              : "border-border hover:border-primary/30 hover:bg-muted/50"
          }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json,application/json"
          className="hidden"
        />

        {newTest.file ? (
          <div className="flex items-center justify-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {newTest.fileName}
            </span>
            <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50"
            >
              <X className="h-4 w-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full mb-2">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-primary">Click to upload</span>{" "}
              or drag and drop
            </div>
            <p className="text-xs text-muted-foreground">JSON files only</p>
          </div>
        )}
      </div>
    </div>
  );
}
