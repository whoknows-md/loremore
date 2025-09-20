import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import "../style/styles.css";
import axios from "axios";

const initialValues = {
  fields: [
    { name: "id", type: "int" },
    { name: "first_name", type: "string" },
    { name: "last_name", type: "string" },
    { name: "gender", type: "string" },
    { name: "age", type: "int" },
    { name: "email", type: "string" },
    { name: "ip_address", type: "int" },
  ],
  rows: 1000,
  format: "JSON",
  lineEnding: "Unix (LF)",
  header: true,
  bom: false,
};

const types = ["int", "string", "float", "boolean"];

export default function Body() {
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleDownload = () => {
    if (!jsonOutput) {
      alert("No JSON to Download");
    }
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        if (!values.rows || values.rows <= 0) {
          alert("Please enter a valid number of rows (greater than 0).");
          setSubmitting(false);
          return;
        }
        try {
          const response = await axios.post("http://localhost:5000/", values);
          setJsonOutput(JSON.stringify(response.data, null, 2));
          console.log("Backend Response:", response.data);
        } catch (error) {
          console.error("Request failed:", error);
          alert("Something went wrong. Check console.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values }) => (
        <div className="bg-[#303030] text-white w-full min-h-screen flex flex-col  items-start  p-4 sm:p-6 lg:flex-row  ">
          <div>
            <Form className="w-full max-w-full ">
              {/* Table header */}
              <div className="grid grid-cols-3 max-w-3xl text-gray-400 gap-4 text-md font-semibold mb-2">
                <div>Field Name</div>
                <div>Type</div>
              </div>

              {/* Dynamic rows */}
              <FieldArray name="fields">
                {({ remove, push }) => (
                  <>
                    {values.fields.map((f, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 max-w-3xl gap-4 items-center p-2 rounded mb-1"
                      >
                        {/* Field name */}
                        <Field
                          name={`fields.${index}.name`}
                          placeholder="field_name"
                          className="p-2 rounded max-w-3xl w-full border border-white/30 bg-transparent focus:outline-none"
                        />

                        {/* Type dropdown */}
                        <Field
                          as="select"
                          name={`fields.${index}.type`}
                          className="p-2 rounded w-full max-w-3xl border border-white/30  bg-[#303030] focus:outline-none"
                        >
                          {types.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Field>

                        <div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className=" px-2 py-1 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push({ name: "", type: "int", blank: 0 })}
                      className="bg-[#303030] border border-white/30 px-4 py-2 mt-2 rounded"
                    >
                      + Add Another Field
                    </button>
                  </>
                )}
              </FieldArray>

              <div className="mt-4 border-t border-gray-700 my-6 pt-4 flex space-x-4 items-center flex-wrap gap-4">
                <label>
                  # Rows:
                  <Field
                    type="number"
                    name="rows"
                    className="bg-transparent ml-2 p-1 w-20 rounded border border-white/30 focus:outline-none"
                  />
                </label>
                <label>
                  Format:
                  <Field
                    as="select"
                    name="format"
                    className="bg-transparent ml-2 p-1 rounded border border-white/30 focus:outline-none"
                  >
                    <option>JSON</option>
                  </Field>
                </label>
              </div>

              <button
                type="submit"
                className="bg-green-600 px-4 py-2 mt-4 rounded hover:bg-green-500 mb-4"
              >
                Generate JSON
              </button>
            </Form>
          </div>
          <div className=" w-full lg:w-[30%]  min-w-[250px] flex flex-col bg-[#303030] border border-white/30 p-5 rounded-md lg:ml-10 lg:mr-4 mt-6 lg:mt-0">
            <h2 className="text-xl font-bold mb-4">JSON Output</h2>

            <div className="h-[65vh] overflow-y-auto scrollbar-hide">
              {jsonOutput ? (
                <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-green-400">
                  {jsonOutput}
                </pre>
              ) : (
                <p className="text-gray-500 italic">
                  Click "Generate JSON" to see output here
                </p>
              )}
            </div>
            {jsonOutput && (
              <>
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 px-4 py-2 mt-4 rounded hover:bg-blue-500"
                >
                  Download JSON
                </button>
                <button
                  onClick={() => {
                    const jsonUrl = "http://localhost:5000/";
                    const editorUrl = `https://json-format.com/?url=${encodeURIComponent(
                      jsonUrl
                    )}`;
                    window.open(editorUrl, "_blank");
                  }}
                  className="bg-blue-600 px-4 py-2 mt-4 rounded hover:bg-blue-500"
                >
                  Editor
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </Formik>
  );
}
