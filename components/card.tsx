import Card from "./card/Card";

  const CardsContainer = () => {
    return (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start p-10">
        <div className="flex flex-col gap-8">
          <Card
            imageSrc="/section_images/credit_union.png"
            number="01"
            subtitle="For Credit Unions"
            title="Seamless Experiences for your Members."
            description="Deliver seamless, personalized experiences that enhance member satisfaction and loyalty."
            buttonText="Know More"
            imageHeight={392}
            imageWidth={392}
          />
          <Card
            imageSrc="/section_images/smb_lending.png"
            number="02"
            subtitle="For SMB Lenders"
            title="Streamline Lending for Growth."
            description="Accelerate loan approvals and reduce costs with AI-powered automation."
            buttonText="Know More"
            imageHeight={392}
            imageWidth={392}
          />
        </div>
        <Card
          imageSrc="/section_images/auto_lenders.png"
          number="03"
          subtitle="For Auto Lenders"
          title="Lending Transformed for Auto Lenders"
          description="Leverage cutting-edge AI and composable workflows to empower your auto lending setup."
          buttonText="Know More"
          isLarge
          imageHeight={708}
          imageWidth={708}
        />
      </div>
    );
  };
  
  export default CardsContainer;
  