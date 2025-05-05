import Button from "./Button";

const CTA2 = () => {
  return (
    <section className="w-full h-[250px] flex justify-center items-center text-white text-center text-[20px] font-semibold bg-secondary">
      {/* Center text and button */}
      <div className="w-[60%] h-full flex flex-col justify-center items-center gap-5">
        <p>
          Can’t Find What You’re Looking For? We Offer Customization! Book a
          Free Call to Create Your Perfect Piece.
        </p>
        <div className="w-fit">
          {" "}
          <Button
            title="Customize now !"
            variant="border-btn"
            icon="chevron_right"
            onClick={"j"}
          />
        </div>
      </div>

      {/* Right image */}
    </section>
  );
};

export default CTA2;
