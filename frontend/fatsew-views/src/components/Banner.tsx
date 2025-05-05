import Button from "./Button";

const Banner = () => {
  return (
    <div className="w-full md:w-[80%] h-3/4 space-y-10">
      <h1 className="w-full md:w-1/2 md:min-w-[600px] text-4xl md:text-5xl font-black text-white leading-12 md:leading-relaxed ">
        Stitching Your Story, One Thread at a Time.
      </h1>

      <p className="w-full md:mt-0 md:w-1/2 text-white">
        At fatsew, we believe in crafting more than just crochet – we’re
        stitching stories, warmth, and personality into every piece. Wrap
        yourself in something truly unique, because with fatsew, every thread
        tells a story.
      </p>

      <div className="w-full md:w-[40%] md:min-w-[400px] flex gap-2 ">
        <Button title="Customize now !" variant="primary-btn" onClick={"j"} />
        <Button
          title="Our app"
          variant="border-btn"
          icon="chevron_right"
          onClick={"j"}
        />
      </div>
    </div>
  );
};

export default Banner;
