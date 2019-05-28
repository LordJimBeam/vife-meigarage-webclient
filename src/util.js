"use strict";

export const responseToDownloadable = httpResponse => {
  const blob = new Blob([httpResponse.data], { type: httpResponse.data.type });
  const url = window.URL.createObjectURL(blob);

  const contentDisposition = httpResponse.headers["content-disposition"];
  let fileName = "unknown";
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
  }
  return {
    url,
    fileName
  };
};

export const invalidate = url => {
  window.URL.revokeObjectURL(url);
};

export const download = ({ url, fileName }, revoke = true) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  if (revoke) {
    invalidate(url);
  }
};
