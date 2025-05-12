import Faq from "react-faq-component";
import React from "react";
const data = {
  rows: [
    {
      title: "Why crochet is expensive ?",
      content: `Crochet takes time , materials are expensive , crochet is 
handmade crochet is unique`,
    },
    {
      title: "Why crochet is expensive ?",
      content: `Crochet takes time , materials are expensive , crochet is 
  handmade crochet is unique`,
    },
    {
      title: "Why crochet is expensive ?",
      content: `Crochet takes time , materials are expensive , crochet is 
  handmade crochet is unique`,
    },
  ],
};

const styles = {
  rowTitleColor: "white",
  rowContentColor: "white",
  arrowColor: "white",
  rowContentPaddingLeft: "50px",
};

const FAQ = () => {
  return (
    <div className="w-full md:w-[80%] px-3">
      <h1 className="text-primary font-black text-3xl text-center uppercase mb-5">
        Frequently asked questions
      </h1>
      <Faq data={data} styles={styles} />
    </div>
  );
};

export default FAQ;
