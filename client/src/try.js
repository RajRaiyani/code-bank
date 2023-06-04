import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { faObjectUngroup } from "@fortawesome/free-solid-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

var Try = () => {
  function main() {
    console.log("main");
  }
  function sub(e) {
    e.stopPropagation();
    console.log("sub");
  }
  const codeString = `
  	num += 1
   	e.stopPropagation();
    console.log("sub");
	console.log("main");
  `;
  return (
    <>
      <SyntaxHighlighter language="javascript" style={coldarkCold}>
        {codeString}
      </SyntaxHighlighter>
    </>
  );
};

export default Try;
