/* eslint-disable import/no-anonymous-default-export */
import dynamic from "next/dynamic";

export default (component) =>
  dynamic(() => import(`./${component}`), {
    ssr: false,
  });
